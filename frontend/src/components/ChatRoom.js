import React, { useEffect, useState } from 'react';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import ChatBox from './ChatBox';
import { getUsers } from '../api/ApiCalls';
import UserList from './UserList';
import PublicConversationList from './PublicConversationList';

var stompClient = null;

const ChatRoom = (props) => {
    
    const {username,token} = props.authState.user;

    const [userData,setUserData] = useState({
        receiverName: "",
        connected: false,
        message: ""
    });

    const [window,setWindow] = useState("Public");

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
    },[]);

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

    };

    const onPrivateMessageReceived = (payload) => {
        let payloadData = JSON.parse(payload.body);

    }

    const onError = (error) => {
        console.log(error);
    }

    const sendPublicMessage = () => {
        if(stompClient){
            let chatMessage = {
                senderName: username,
                message: userData.message,
                conversationId: 1,
            };

            stompClient.send(`/app/message`,{},JSON.stringify(chatMessage));
            setUserData({...userData, message:""});
        }
    }

    const sendPrivateMessage=()=>{
        if (stompClient) {
          var chatMessage = {
            senderName: username,
            receiverName:window,
            message: userData.message,
            status:"MESSAGE"
          };
            stompClient.send("/app/private-message",{}, JSON.stringify(chatMessage));
            setUserData({...userData,"message": ""});
        }
    }

    
    const onClickUser = (clickedUsername) => {
        setWindow(clickedUsername);
    }

    const onClickPublicChat = (publicChatId) => {
        setWindow(`Public Chat ${publicChatId}`);
    }
    return (
        <div className='container'>
        {userData.connected && (
            <div className='row'>
                <div className='col-md-3'>
                    <div className="list-group">
                            <PublicConversationList onClickPublicChat={onClickPublicChat}/>
                    </div>
                </div>
                <div className='col-md-6'>
                    <div>
                        <ChatBox window={window}/>
                        <div>
                            <input className='form-control' type='text' placeholder='Type message here' onChange={handleMessage} value={userData.message} style={{width:'550px'}}/>
                            <span class="material-symbols-outlined" onClick={window.includes("Public") ? sendPublicMessage : sendPrivateMessage} style={{cursor: 'pointer'}}>
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