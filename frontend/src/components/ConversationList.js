import React from 'react';
import "../css/ChatList.css"
import publicChatLogo from "../assets/meeting.png"
import { useState } from 'react';
import { useEffect } from 'react';
import { getPublicConversations } from '../api/ApiCalls';

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
            </div>
        </div>
    );
};

export default ConversationList;