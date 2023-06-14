import React from 'react';
import { getMessagedUsers } from '../api/ApiCalls';
import { useState } from 'react';
import { useEffect } from 'react';

const MessagedUserList = (props) => {

    const {token} = props.authState;

    const {newMessagesCount} = props;

    return (
        <>
        {props.messagedUsers.map((username,index) => {
            return(
            <li className="clearfix" onClick={() => {props.onClickUser(username.username)}}>
                {/*<img src={} alt="avatar" width={'32px'}/>*/}
                <div className="about">
                    <div className="name">{username.username}</div>
                    {newMessagesCount[username.username] > 0 && <span class="badge">{newMessagesCount[username.username]}</span>}
                </div>
            </li>
            );
        })}
        </>
    );
};

export default MessagedUserList;