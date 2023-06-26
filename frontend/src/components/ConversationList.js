import React from 'react';
import "../css/ChatList.css"
import publicChatLogo from "../assets/meeting.png"
import { useState } from 'react';
import { useEffect } from 'react';
import { getPublicConversations, logout, searchUsersLike } from '../api/ApiCalls';
import UserList from './UserList';
import MessagedUserList from './MessagedUserList';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { useApiProgress } from '../shared/ApiProgress';
import { BASE_URL } from '../shared/BaseUrl';

const ConversationList = (props) => {

    const [publicConversations, setPublicConversations] = useState([]);
    const [searchInput,setSearchInput] = useState();
    const [searchedUsers,setSearchedUsers] = useState([]);

    const {newMessagesCount} = props;

    const pendingApiCall = useApiProgress("get",`${BASE_URL}/api/v1/users?pageable=false&like`,false);

    useEffect(() => {
        loadPublicConversations();
    },[]);

    const loadPublicConversations = async () => {
        try {
            const response = await getPublicConversations(props.authState.token);
            setPublicConversations(response.data);
        } catch (error) {
            
        }
    } 


    const handleConversationClick = (conversationId) => {
        props.onClickPublicChat(conversationId);
    }

    const onClickSearch = async () => {
        try {
            const response = await searchUsersLike(searchInput,props.authState.token);
            setSearchedUsers(response.data);
            setSearchInput("");
        } catch (error) {
            
        }
        
    }

    const onClickLogout = async () => {
        try {
            await logout(props.authState.token);
        } catch (error) {
            
        }
    }

    return (
        <>
        <div className='container-people'>
            <div className="people-list" id="people-list">
                <div style={{ display: 'flex', alignItems: 'center', color: 'white', textDecoration: 'none' }}>
                    <Link to="/profile" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', textDecoration: 'none' }}>
                        <span className='material-symbols-outlined' style={{ marginRight: '5px', fontSize: '32px' }}>
                        person
                        </span>
                        <p style={{ margin: '0', fontSize: '16px' }}>My Profile</p>
                    </Link>
                    <Link to="/logout" style={{ marginLeft: '160px', marginTop:"5px", textDecoration: 'none' }} onClick={onClickLogout}>
                        <span className="material-symbols-outlined" style={{ fontSize: '24px', cursor: 'pointer' }}>
                        logout
                        </span>
                    </Link>
                </div>
                <div className="search">
                    <p>Search</p>
                    
                    {pendingApiCall ? <div className='loader'></div> :
                    <input type="text" placeholder="search" onChange={(event) => setSearchInput(event.target.value)}/>
                    }
                    
                    
                    <span class="material-symbols-outlined" style={{cursor:"pointer"}} onClick={onClickSearch}>
                    search
                    </span>
                </div>
                <div className='scroll'>
                    <ul className="list" style={{marginBottom:"0px", paddingBottom:"0px"}}>
                    <hr />
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
                    <hr />
                    </ul>
                    <div className="search">
                        <p className='title'>Chats</p>
                    </div>
                    <ul className="list" style={{marginBottom:"0px", paddingBottom:"0px"}}>
                        <MessagedUserList newMessagesCount={newMessagesCount} authState={props.authState} messagedUsers={props.messagedUsers} onClickUser={props.onClickUser}/>
                    <hr />
                    </ul>
                    <div className="search">
                        <p className='title'>All Users</p>
                    </div>
                    <ul className="list">
                        <UserList authState={props.authState} onClickUser={props.onClickUser} searchedUsers={searchedUsers}/>                    
                    </ul>
                </div>
            </div>
        </div>
        </>
    );
};

export default ConversationList;