import React, { useEffect, useState } from 'react';
import { getUsers } from '../api/ApiCalls';

const UserList = (props) => {
    

    const [page,setPage] = useState({
        content: [],
        size: 0,
        number: 0,
        last: false,
        first: false
    });

    useEffect(() => {loadUsers()}, [])

    const loadUsers = async () => {

        try {
            const response = await getUsers();
            setPage(response.data);
        } catch (error) {
            console.log(error);
        }
    }    
    

    return (
        <>
        {page.content.map((user,index) => {
            return(
                <li class="list-group-item" aria-current="true">
                    <span onClick={() => {props.onClickUser(user.username)}} style={{cursor:'pointer'}}>{user.username}</span>
                </li>
            );
        }) }
        </>
    );
};

export default UserList;