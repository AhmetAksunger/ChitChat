import React from 'react';

const MessagedUserList = (props) => {

    const {token} = props.authState;

    const {newMessagesCount} = props;

    return (
        <>
        {props.messagedUsers.map((user,index) => {
            const base64Image = user.profileImage;
            let imageSource = "https://bootdey.com/img/Content/avatar/avatar6.png"
            if(base64Image){
                imageSource = `data:image/jpeg;base64,${base64Image}`;
            }
            return(
            <li className="clearfix" onClick={() => {props.onClickUser(user.username)}}>
                <img src={imageSource} alt="avatar" width='32px' height='32px' style={{borderRadius: '50%'}}/>
                <div className="about">
                    <div className="name">{user.username}</div>
                    {newMessagesCount[user.username] > 0 && <span class="badge">{newMessagesCount[user.username]}</span>}
                </div>
            </li>
            );
        })}
        </>
    );
};

export default MessagedUserList;