import React, { useEffect, useState } from 'react';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import ChatBox from './ChatBox';
import { getConversationMessages, getMessagedUsers, getPrivateConversationMessages } from '../api/ApiCalls';
import ConversationList from './ConversationList';

var stompClient = null;

const ChatRoom = (props) => {
    
    const {token,user} = props.authState;
    const {username} = user;
    
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
        conversationId: 0,
        messages: [],
        exists: true
    });

    const [newMessagesCount, setNewMessagesCount] = useState({});

    const [messagedUsers, setMessagedUsers] = useState([]);

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
        let Sock = new SockJS("http://localhost:8080/ws");
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
        const {conversationId,user} = payloadData;
        if(chatWindow === `Public Chat ${conversationId}`){
            loadConversationMessages(conversationId);
        }
        if(user.username !== username){
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
        const {conversationId, user} = payloadData;
        
        if(chatWindow === user.username){
            loadConversationMessages(conversationId);
        }else if(user.username === username){
            loadConversationMessages(conversationId);
        }
        if(user.username !== username){
            setNewMessagesCount((previousState) => {
                const updatedState = {...previousState};
    
                if (user.username in updatedState) {
                    updatedState[user.username] += 1;
                  } else {
                    updatedState[user.username] = 1;
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
            const response = await getPrivateConversationMessages(clickedUsername,token);
            setConversationMessages(response.data);
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
            const response = await getConversationMessages(conversationId);

            if(response.data.messages.length === 1){
                loadMessagedUsers();
            };

            setConversationMessages(response.data);
            setChatId(conversationId);
        } catch (error) {
            console.log(error);
        }
    }

    return (
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
                        <ChatBox authState={props.authState} window={chatWindow} conversationId={chatId} conversationMessages={conversationMessages} loadConversationMessages={loadConversationMessages}/>
                        <div>
                            <input className='form-control' type='text' placeholder='Type message here' onChange={handleMessage} value={userData.message} style={{width:'550px'}}/>
                            <span class="material-symbols-outlined" onClick={chatWindow.includes("Public") ? ()=> {sendPublicMessage(chatId)} : () => sendPrivateMessage()} style={{cursor: 'pointer'}}>
                            send
                            </span>    
                        </div>
                    </div>
                </div>

            </div>
        )}
        </div>

    );
};

export default ChatRoom;