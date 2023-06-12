import React from 'react';
import "../css/ChatList.css"
import publicChatLogo from "../assets/meeting.png"
import { useState } from 'react';
import { useEffect } from 'react';
import { getPublicConversations } from '../api/ApiCalls';
import UserList from './UserList';

const ConversationList = (props) => {

    const [publicConversations, setPublicConversations] = useState([]);
    const [activeConversationId, setActiveConversationId] = useState(1);

    const {newMessagesCount} = props;

    useEffect(() => {
        loadPublicConversations();
    },[]);

    const loadPublicConversations = async () => {
        try {
            const response = await getPublicConversations();
            setPublicConversations(response.data);
        } catch (error) {
            
        }
    } 


    const handleConversationClick = (conversationId) => {
        props.onClickPublicChat(conversationId);
    }

    return (
        <div className='container-people'>
            <div className="people-list" id="people-list">
                <div className="search">
                    <p>Search</p>
                    <input type="text" placeholder="search" />
                </div>
                <hr />
                <div className='scroll'>
                    <ul className="list">
                        {publicConversations.map((chat,index) => {
                            return(
                            <li className="clearfix" onClick={() => {handleConversationClick(chat.id)}}>
                                <img src={publicChatLogo} alt="avatar" width={'32px'}/>
                                <div className="about">
                                    <div className="name">{`Public Chat ${chat.id}`}</div>
                                    {newMessagesCount[chat.id] > 0 && <span class="badge">{newMessagesCount[chat.id]}</span>}
                                </div>
                            </li>
                        );
                        })}
                        
                    </ul>
                    <hr />
                    <div className="search">
                        <p>All Users</p>
                    </div>
                    <ul className="list">
                        <UserList onClickUser={props.onClickUser}/>                    
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ConversationList;