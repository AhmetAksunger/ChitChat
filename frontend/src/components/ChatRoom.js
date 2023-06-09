import React, { useEffect, useState } from 'react';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import ChatBox from './ChatBox';
import { getUsers } from '../api/ApiCalls';
import UserList from './UserList';

var stompClient = null;

const ChatRoom = (props) => {
    
    const {username} = props.authState.user;

    const [userData,setUserData] = useState({
        receiverName: "",
        connected: false,
        message: ""
    });

    const [window,setWindow] = useState("PUBLIC");

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
        userJoin();
    };

    const userJoin = () => {
        let chatMessage = {
            senderName: username,
            status: "JOIN"
        };

        stompClient.send(`/app/message`,{},JSON.stringify(chatMessage));
    }

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
                status: "MESSAGE"
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

            privateMessages.get(window).push(chatMessage);
            setPrivateMessages(new Map(privateMessages));
            stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
            setUserData({...userData,"message": ""});
        }
    }

    
    const onClickUser = (clickedUsername) => {
        setWindow(clickedUsername);
    }


    return (
        <div className='container'>
        {userData.connected && (
            <div className='row'>
                <div className='col-md-3'>
                    <div className="list-group">
                        <span className="list-group-item list-group-item-action active" aria-current="true">
                            <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">Public Chat</h5>
                            </div>
                            <p className="mb-1">This channel is for general discussions and public messages.</p>
                        </span>
                    </div>
                </div>
                <div className='col-md-6'>
                    <div>
                        <ChatBox window={window} privateMessages={privateMessages} publicMessages={publicMessages} addOfflineUser={addOfflineUser}/>
                        <div>
                            <input className='form-control' type='text' placeholder='Type message here' onChange={handleMessage} value={userData.message} style={{width:'550px'}}/>
                            <span class="material-symbols-outlined" onClick={window==="PUBLIC" ? sendPublicMessage : sendPrivateMessage} style={{cursor: 'pointer'}}>
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