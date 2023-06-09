import React from 'react';
import { getPublicConversations } from '../api/ApiCalls';
import { useState } from 'react';
import { useEffect } from 'react';

const PublicConversationList = (props) => {

    const [publicConversations, setPublicConversations] = useState([]);
    const [activeConversationId, setActiveConversationId] = useState(1);

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
        setActiveConversationId(conversationId);
        props.onClickPublicChat(conversationId);
    }
    
    return (
        <>
            {publicConversations.map((conversation,index) => {
                const isActive = conversation.id === activeConversationId;
                let className = "list-group-item list-group-item-action";
                if(isActive){className = "list-group-item list-group-item-action active"}
                return(
                    <span className={className} style={{cursor:'pointer'}} aria-current="true" onClick={() => {handleConversationClick(conversation.id)}}>
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">{`Public Chat ${conversation.id}`}</h5>
                        </div>
                        <p className="mb-1">This channel is for general discussions and public messages.</p>
                    </span>
                );
            })}
           
        </>
    );
};

export default PublicConversationList;