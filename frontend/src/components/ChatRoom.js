import React, { useEffect, useState } from 'react';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import ChatBox from './ChatBox';
import { getConversationMessages, getUsers } from '../api/ApiCalls';
import UserList from './UserList';
import ConversationList from './ConversationList';

var stompClient = null;

const ChatRoom = (props) => {
    
    const {username,token} = props.authState.user;

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
        messages: []
    });

    const [newMessagesCount, setNewMessagesCount] = useState({});

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
    }

    const onError = (error) => {
        console.log(error);
    }

    const sendPublicMessage = (conversationId) => {
        if(stompClient){
            let chatMessage = {
                senderName: username,
                message: userData.message,
                conversationId: conversationId,
            };

            stompClient.send(`/app/message`,{},JSON.stringify(chatMessage));
            setUserData({...userData, message:""});
        }
    }

    const sendPrivateMessage=()=>{
        if (stompClient) {
          var chatMessage = {
            senderName: username,
            receiverName:chatWindow,
            message: userData.message,
            status:"MESSAGE"
          };
            stompClient.send("/app/private-message",{}, JSON.stringify(chatMessage));
            setUserData({...userData,"message": ""});
        }
    }

    
    const onClickUser = (clickedUsername) => {
        setChatWindow(clickedUsername);
    }

    const onClickPublicChat = (publicChatId) => {
        setChatWindow(`Public Chat ${publicChatId}`);
        setChatId(publicChatId);
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
            setConversationMessages(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <div className='container'>
        {userData.connected && (
            <div className='row'>
                <div className='col-md-3'>
                    <div className="list-group">
                        <ConversationList onClickPublicChat={onClickPublicChat} newMessagesCount={newMessagesCount}/>
                    </div>
                </div>
                <div className='col-md-6'>
                    <div>
                        <ChatBox window={chatWindow} conversationId={chatId} conversationMessages={conversationMessages}/>
                        <div>
                            <input className='form-control' type='text' placeholder='Type message here' onChange={handleMessage} value={userData.message} style={{width:'550px'}}/>
                            <span class="material-symbols-outlined" onClick={chatWindow.includes("Public") ? ()=> {sendPublicMessage(chatId)} : sendPrivateMessage} style={{cursor: 'pointer'}}>
                            send
                            </span>    
                        </div>
                    </div>
                </div>
                <div className='col-md-3'>
                    <ul class="list-group">
                        <li class="list-group-item active" aria-current="true">All Users</li>
                        <UserList onClickUser={onClickUser}/>
                    </ul>
                </div>
            </div>
        )}
        </div>

    );
};

export default ChatRoom;