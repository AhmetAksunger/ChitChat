import React from 'react';
import '../css/ChatBox.css'
import { getConversationMessages, getPrivateConversationMessages, startConversationWithUser } from '../api/ApiCalls';
const ChatBox = (props) => {

    const {window,conversationMessages,authState,loadConversationMessages} = props;

    const {user , token} = authState;
    const {username: loggedInUser} = user;

    const {messages: messageEntities, exists} = conversationMessages;

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
    }

    if(!exists){
        return(
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title text-center">You have no conversation started with this user</h5>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button onClick={onClickStartConv} className="btn btn-success" style={{ display: 'flex', alignItems: 'center', marginBottom:'10px' }}>
                            <span className="material-symbols-outlined" style={{ marginRight: '5px' }}>add_circle</span>
                            <span>Start a conversation</span>
                        </button>
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
                            <ul className="chat-list">
                                {messageEntities.map((messageEntity,index) => {
                                    if(messageEntity.user.username === loggedInUser){
                                        return(
                                            <li className="out">
                                                <div className="chat-img">
                                                    <img alt="Avtar" src="https://bootdey.com/img/Content/avatar/avatar6.png" />
                                                </div>
                                                <div className="chat-body">
                                                    <div className="chat-message">
                                                        <strong style={{fontSize: "1.5rem"}}>{messageEntity.user.username}</strong>
                                                        <p style={{fontSize: "1.5rem"}}>{messageEntity.message}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    }else{
                                        return(
                                            <li className="in">
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
        
    );
};

export default ChatBox;