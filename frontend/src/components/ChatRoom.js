import React, { useState } from 'react';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';

var stompClient = null;

const ChatRoom = (props) => {
    
    const {username} = props.authState.user;

    const [userData,setUserData] = useState({
        receiverName: "",
        connected: false,
        message: ""
    });

    const [publicMessages,setPublicMessages] = useState([])
    
    const [privateMessages, setPrivateMessages] = useState(new Map());

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
            sender: {username: username},
            status: "JOIN"
        };

        stompClient.send(`/app/message`,{},JSON.stringify(chatMessage));
    }

    const onPublicMessageReceived = (payload) => {
        console.log("in");
        let payloadData = JSON.parse(payload.body);
        switch (payloadData.status) {
            case "JOIN":
                if(privateMessages.get(payloadData.senderName === null)){
                    privateMessages.set(payloadData.senderName,[]);
                }
                break;
            case "MESSAGE":
                setPublicMessages((prevPublicMessages) => [...prevPublicMessages, payloadData]);
                break;
        }
    };

    const onPrivateMessageReceived = (payload) => {
        let payloadData = JSON.parse(payload.body);
        if(privateMessages.get(payloadData.senderName) !== null){
            privateMessages.get(payloadData.senderName).push(payloadData);
            setPrivateMessages(new Map(privateMessages));
        }else{
            let list = [];
            list.push(payloadData);
            privateMessages.set(payloadData.senderName,list);
            setPrivateMessages(new Map(privateMessages));
        }
    }

    const onError = (error) => {
        console.log(error);
    }

    const sendPublicMessage = () => {
        if(stompClient){
            let chatMessage = {
                sender: {username:username},
                message: userData.message,
                status: "MESSAGE"
            };

            stompClient.send(`/app/message`,{},JSON.stringify(chatMessage));
            setUserData({...userData, message:""});
        }
    }

    return (
        <div className='container'>
            {userData.connected ? 
            <div>
                <ul className="list-group">
                    <li>Chatrooms</li>
                    {[...privateMessages.keys()].map((name,index) => {
                        return (

                            <li className="list-group-item" key={index}>{name}</li>
                        );
                    })}
                    {publicMessages.map((data,index) => {
                        return(
                            <>
                            <label>{data.sender.username}</label>
                            <li key={index} className="list-group-item">{data.message}</li>
                            </>
                        );
                    })}
                </ul>

                <div>
                    <input type='text' placeholder='Send Public Message' onChange={handleMessage}/>
                    <button className='btn btn-secondary' onClick={sendPublicMessage}>Send</button>
                </div>
            </div>
            :
        
            <div>
                <button className='btn btn-primary' onClick={registerUser}>Register</button>
            </div>
        
        
            }
        </div>
    );
};

export default ChatRoom;