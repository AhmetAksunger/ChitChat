import React, { useEffect, useState } from 'react';
import { getUsers } from '../api/ApiCalls';

const UserList = (props) => {
    
    const {token} = props.authState;

/*
    const [page,setPage] = useState({
        content: [],
        size: 0,
        number: 0,
        last: false,
        first: false
    });
*/

    const [users,setUsers] = useState([]);
    useEffect(() => {loadUsers()}, [])

    const loadUsers = async () => {

        try {
            const response = await getUsers(false,token);
            //setPage(response.data);
            setUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    }    
    

    return (
        <>
        {users.map((username,index) => {
            return(
            <li className="clearfix" onClick={() => {props.onClickUser(username.username)}}>
                {/*<img src={} alt="avatar" width={'32px'}/>*/}
                <div className="about">
                    <div className="name">{username.username}</div>
                </div>
            </li>
            );
        })}
        </>
    );
};

export default UserList;