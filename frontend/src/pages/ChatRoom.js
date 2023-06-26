import React, { useEffect, useState } from 'react';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import ChatBox from '../components/ChatBox';
import { getConversationMessages, getMessagedUsers, getPrivateConversationMessages } from '../api/ApiCalls';
import ConversationList from '../components/ConversationList';
import Modal from '../components/Modal';
import { BASE_URL } from '../shared/BaseUrl';

var stompClient = null;

const ChatRoom = (props) => {
    
    const {token,user} = props.authState;
    const {username} = user;
    
    const [sendButtonActive,setSendButtonActive] = useState(true);

    const [modalVisible, setModalVisible] = useState(false);

    const [userData,setUserData] = useState({
        receiverName: "",
        connected: false,
        message: ""
    });

    const [chatWindow, setChatWindow] = useState(() => {
        return "Public Chat 1";
      });
    
    const [chatId,setChatId] = useState(1);

    const [conversationMessages,setConversationMessages] = useState({
        clickedUsername: "",
        conversationId: 0,
        messages: [],
        exists: true
    });

    const [newMessagesCount, setNewMessagesCount] = useState({});

    const [messagedUsers, setMessagedUsers] = useState([]);

    const [messageEntityToBeDeleted,setMessageEntityToBeDeleted] = useState({
        id: 0,
        message: "",
        conversationId: 0,
        user: {username: ""}
    });

    const loadMessagedUsers = async () => {
        try {
            const response = await getMessagedUsers(token);
            setMessagedUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleMessage = (event) => {
        const message = event.target.value;
        setUserData({
            ...userData,
            message: message
        });
    }

    const registerUser = () => {
        let Sock = new SockJS(`${BASE_URL}/ws`);
        stompClient=over(Sock);
        stompClient.connect({},onConnected,onError);
    };

    useEffect(()=>{
        registerUser();
        loadConversationMessages(chatId);
        loadMessagedUsers();
        return () => {
            if (stompClient) {
              stompClient.disconnect();
            }
          };
    },[chatId]);

    const onConnected = () => {
        setUserData({
            ...userData,
            connected: true
        });
        
        stompClient.subscribe("/chatroom/public",onPublicMessageReceived);
        stompClient.subscribe(`/user/${username}/private`,onPrivateMessageReceived);
    };


    const onPublicMessageReceived = (payload) => {
        let payloadData = JSON.parse(payload.body);
        const {conversationId,username: responseUsername} = payloadData;
        if(chatWindow === `Public Chat ${conversationId}`){
            loadConversationMessages(conversationId);
        }
        if(responseUsername !== username){
            setNewMessagesCount((previousState) => {
                const updatedState = {...previousState};
    
                if (conversationId in updatedState) {
                    updatedState[conversationId] += 1;
                  } else {
                    updatedState[conversationId] = 1;
                  }
    
                  return updatedState;
            });
        }

    };

    const onPrivateMessageReceived = (payload) => {
        let payloadData = JSON.parse(payload.body);
        const {conversationId, username: responseUsername} = payloadData;
        
        loadMessagedUsers();

        if(chatWindow === responseUsername){
            loadConversationMessages(conversationId);
        }else if(responseUsername === username){
            loadConversationMessages(conversationId);
        }
        if(responseUsername !== username){
            setNewMessagesCount((previousState) => {
                const updatedState = {...previousState};
    
                if (responseUsername in updatedState) {
                    updatedState[responseUsername] += 1;
                  } else {
                    updatedState[responseUsername] = 1;
                  }
    
                  return updatedState;
            });
        }
    }

    const onError = (error) => {
        console.log(error);
    }

    const sendPublicMessage = (chatId) => {
        if(stompClient){
            let chatMessage = {
                senderName: username,
                message: userData.message,
                conversationId: chatId,
            };

            stompClient.send(`/app/message`,{},JSON.stringify(chatMessage));
            setUserData({...userData, message:""});
        }
    }

    const sendPrivateMessage=(conversationId)=>{
        if (stompClient) {
          var chatMessage = {
            senderName: username,
            receiverName: chatWindow,
            message: userData.message,
            conversationId: chatId
          };
            stompClient.send("/app/private-message",{}, JSON.stringify(chatMessage));
            setUserData({...userData,"message": ""});
        }
    }

    
    const onClickUser = async (clickedUsername) => {
        try {
            if(clickedUsername === username){
                setConversationMessages({clickedUsername:clickedUsername});
                setChatWindow(clickedUsername);
                return;
            }
            const response = await getPrivateConversationMessages(clickedUsername,token);
            setConversationMessages({
                ...response.data,
                clickedUsername:clickedUsername
            });
            setChatId(response.data.id);

            setNewMessagesCount((previousState) => {
                const updatedState = {...previousState};
                
                updatedState[clickedUsername] = 0;
                return updatedState;
            });
        } catch (error) {
            
        }
        setChatWindow(clickedUsername);
    }

    const onClickPublicChat = (publicChatId) => {
        setChatWindow(`Public Chat ${publicChatId}`);
        loadConversationMessages(publicChatId);

        setNewMessagesCount((previousState) => {
            const updatedState = {...previousState};
            
            updatedState[publicChatId] = 0;
            return updatedState;
        });
    }

    const loadConversationMessages = async (conversationId) => {
        try {
            const response = await getConversationMessages(conversationId,token);

            if(response.data.messages.length === 1){
                loadMessagedUsers();
            };

            setConversationMessages(response.data);
            setChatId(conversationId);
        } catch (error) {
            console.log(error);
        }
    }
    
    //Modal
    const onClickDelete = (messageEntity) => {
        setMessageEntityToBeDeleted(messageEntity);
        setModalVisible(true);
    }
    const onClickCancel = () => {
        setModalVisible(false);
    }

    const onClickEnter = (event) => {
        if(event.key === "Enter"){
            if(chatWindow.includes("Public")){
                sendPublicMessage(chatId);
            }
            else{
                sendPrivateMessage();
            }
        }
    }

    const onClickSendMessage = () => {
        if(chatWindow === username){
            console.log("a");
            return;
        }
        if(chatWindow.includes("Public")){
            sendPublicMessage(chatId);
        }else{
            sendPrivateMessage();
        }
    }

    return (
        <>
        <div className='container'>
        {userData.connected && (
            <div className='row'>
                <div className='col-md-3' style={{marginTop:'40px'}}>
                                        
                    {/*<div className="list-group">
                        <ConversationItem onClickPublicChat={onClickPublicChat} newMessagesCount={newMessagesCount}/>
        </div> */}
                    <ConversationList authState={props.authState} onClickUser={onClickUser} onClickPublicChat={onClickPublicChat} newMessagesCount={newMessagesCount}
                    messagedUsers={messagedUsers}
                    />

                </div>
                <div className='col-md-5'>
                    <div className='container'>
                        <ChatBox authState={props.authState} window={chatWindow} conversationId={chatId} conversationMessages={conversationMessages} loadConversationMessages={loadConversationMessages} 
                        onClickDelete={onClickDelete} setSendButtonActive={setSendButtonActive}
                        />
                        <div>
                            <input className='form-control' type='text' placeholder='Type message here' onChange={handleMessage} value={userData.message} style={{width:'550px', height:'40px'}} onKeyDown={onClickEnter}/>
                            <button className='btn btn-success' disabled={!sendButtonActive} onClick={onClickSendMessage} style={{cursor: 'pointer', marginTop:"5px"}}>Send</button>  
                        </div>
                    </div>
                </div>
            </div>
        )}
        </div>
        <Modal authState={props.authState} setModalVisibility={setModalVisible} visible={modalVisible} messageEntity={messageEntityToBeDeleted} onClickCancel={onClickCancel} loadConversationMessages={loadConversationMessages}/>
        </>
    );
};

export default ChatRoom;