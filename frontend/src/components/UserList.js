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
            {props.searchedUsers.length !== 0 ? (
            props.searchedUsers.map((user, index) => {
                const base64Image = user.profileImage;
                let imageSource = "https://bootdey.com/img/Content/avatar/avatar6.png";
                if (base64Image) {
                imageSource = `data:image/jpeg;base64,${base64Image}`;
                }
                return (
                <li className="clearfix" onClick={() => {props.onClickUser(user.username)}}>
                    <img src={imageSource} alt="avatar" width='32px' height='32px' style={{borderRadius: '50%'}}/>
                    <div className="about">
                    <div className="name">{user.username}</div>
                    </div>
                </li>
                );
            })
            ) : (
            users.map((user, index) => {
                const base64Image = user.profileImage;
                let imageSource = "https://bootdey.com/img/Content/avatar/avatar6.png";
                if (base64Image) {
                imageSource = `data:image/jpeg;base64,${base64Image}`;
                }
                return (
                <li className="clearfix" onClick={() => {props.onClickUser(user.username)}}>
                    <img src={imageSource} alt="avatar" width='32px' height='32px' style={{borderRadius: '50%'}}/>
                    <div className="about">
                    <div className="name">{user.username}</div>
                    </div>
                </li>
                );
            })
            )}

        </>
    );
};

export default UserList;