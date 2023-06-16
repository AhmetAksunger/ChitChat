import React, { useState } from 'react';
import '../css/ChatBox.css'
import { getConversationMessages, getPrivateConversationMessages, startConversationWithUser } from '../api/ApiCalls';
import { useEffect } from 'react';
import { useRef } from 'react';
import DropdownDelete from './DropdownDelete';
const ChatBox = (props) => {

    const {window,conversationMessages,authState,loadConversationMessages} = props;

    const {user , token} = authState;
    const {username: loggedInUser} = user;

    const {messages: messageEntities, exists} = conversationMessages;

    const chatListRef = useRef(null);

    const [hoveredMessageIndex,setHoveredMessageIndex] = useState(null);

    useEffect(() => {
        scrollToBottom();
    },[messageEntities]);

    const onClickStartConv = async () => {
        try {
            const data = {
                participants: [window]
            };
            const response = await startConversationWithUser(data,token);
            props.loadConversationMessages(response.data.id);
        } catch (error) {
            console.log(error);
        }
    };

    const scrollToBottom = () => {
        if (chatListRef.current && chatListRef.current.lastElementChild) {
          chatListRef.current.lastElementChild.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
          });
        }
      };
      //<h5 class="card-title text-center">You have no conversation started with this user</h5>
      
    if(!exists){
        return(
            <div className='container content'>
                <div className='row'>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <div className="card">
                            <div className="card-header text-center" style={{fontSize: "2rem"}}>{window}</div>
                            <div className="card-body height3 d-flex flex-column align-items-center">
                                <div className='text-center'>
                                    <ul className='chat-list'>
                                        <li className='out'>
                                            <div className="chat-img">
                                                <img alt="Avtar" src="https://bootdey.com/img/Content/avatar/avatar6.png" />
                                            </div>
                                            <div className='chat-body'>
                                                <div className='chat-message'>
                                                    <h4>You have no conversation with this user yet</h4>
                                                    <button onClick={onClickStartConv} className="btn btn-success custom-button" style={{marginBottom:'10px'}}>
                                                        <span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '5px' }}>add_circle</span>
                                                        <span style={{ verticalAlign: 'middle' }}>Start a conversation</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
 
        );
    }

    return (
        <div className="container content">
            <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="card">
                        <div className="card-header text-center" style={{fontSize: "2rem"}}>{window}</div>
                        <div className="card-body height3">
                            <div class="chat-wrapper">
                                <ul className="chat-list" ref={chatListRef}>
                                    {messageEntities.map((messageEntity,index) => {
                                        if(messageEntity.user.username === loggedInUser){
                                            return(
                                                <li className="out" key={index}>
                                                    <div className="chat-img">
                                                        <img alt="Avtar" src="https://bootdey.com/img/Content/avatar/avatar6.png" />
                                                    </div>
                                                    <div className="chat-body">
                                                    <div className="chat-message" onMouseEnter={() => setHoveredMessageIndex(index)} onMouseLeave={() => setHoveredMessageIndex(null)}>
                                                        <div style={{ display: "flex" }}>
                                                            {hoveredMessageIndex === index && <span class="material-symbols-outlined " style={{ cursor:'pointer', width: '8px', height: '6px', marginRight: '10px' }}>delete</span>}
                                                            <strong style={{ fontSize: "1.5rem" , marginLeft:'10px'}}>{messageEntity.user.username}</strong>
                                                        </div>
                                                        <p style={{ fontSize: "1.5rem" }}>{messageEntity.message}</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        }else{
                                            return(
                                                <li className="in" key={index}>
                                                    <div className="chat-img">
                                                        <img alt="Avtar" src="https://bootdey.com/img/Content/avatar/avatar1.png" />
                                                    </div>
                                                    <div className="chat-body">
                                                        <div className="chat-message">
                                                            <strong style={{fontSize: "1.5rem"}}>{messageEntity.user.username}</strong>
                                                            <p style={{fontSize: "1.5rem"}}>{messageEntity.message}</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        }
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
};

export default ChatBox;