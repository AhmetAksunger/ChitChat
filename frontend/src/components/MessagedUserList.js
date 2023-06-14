import React from 'react';
import { getMessagedUsers } from '../api/ApiCalls';
import { useState } from 'react';
import { useEffect } from 'react';

const MessagedUserList = (props) => {

    const {token} = props.authState;

    const [messagedUsers, setMessagedUsers] = useState([]);

    useEffect(()=>{loadMessagedUsers();},[]);

    const loadMessagedUsers = async () => {
        try {
            const response = await getMessagedUsers(token);
            setMessagedUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            
        </div>
    );
};

export default MessagedUserList;