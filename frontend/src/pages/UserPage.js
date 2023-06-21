import React, { useState } from 'react';
import { saveProfileImage, updateUser } from '../api/ApiCalls';
const UserPage = (props) => {

    const {authState} = props;
    const {token,user} = authState;

    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const [newUsername,setNewUsername] = useState();
    const [oldPassword,setOldPassword] = useState();
    const [newPassword,setNewPassword] = useState();
    const [errors,setErrors] = useState({
        username:"",
        image:"",
        password:""

    });

    const uploadFile = async (file) => {
        const attachment = new FormData();
        attachment.append('file',file);
        console.log(props.authState.token);
        const response = await saveProfileImage(attachment,token);
    }

    const onChangeFile = (event) => {
        if(event.target.files.length < 1){
            return;
        }
        const file = event.target.files[0];
        const fileReader = new FileReader();
        
        //fileReader.onloadend = () => {
        //}

        fileReader.readAsDataURL(file);

        uploadFile(file);
    }

    const onClickSavePassword = async () => {
        const body = {
            oldPassword: oldPassword,
            newPassword: newPassword
        }
        try {
            await updateUser(user.id,body,token);            
            
        } catch (error) {
            
            setErrors((previousState) => {return({...previousState,password:error.response.data.message})});
        }
    }

    let imageSource = "https://bootdey.com/img/Content/avatar/avatar6.png"
    if(user.profileImage){
        imageSource = `data:image/jpeg;base64,${user.profileImage}`;
    }
    return (
        <>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className="modal" style={{height:"700px"}}>
                <img src={imageSource} width='256px' height='256px' style={{borderRadius: '50%', marginBottom:"10px"}}/>
                <p className="message">{user.username}</p>
      
                <label style={{ fontSize: '2rem', color: 'purple'}}>New Username</label>
                <input type="text" className="form-control" onChange={(event) => setNewUsername(event.target.value)} style={{ width: '500px', marginBottom:"20px" }} />

                <label style={{ fontSize: '2rem', color: 'purple' }}>Choose a profile picture</label>
                <input type="file" className="form-control" onChange={onChangeFile} style={{ width: '500px' }} />
                
                <a style={{marginTop:"10px",cursor:"pointer"}} onClick={() => setShowPasswordModal(true)}>Want to change your password?</a>
                <div className="options" style={{marginTop:"20px"}}>
                <button className='btn btn-success'>Save</button>
                <button className='btn btn-danger'>Cancel</button>
                </div>
            </div>
        </div>
        {showPasswordModal && 
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div className="modal" style={{height:"400"}}>
        
                    <label style={{ fontSize: '2rem', color: 'purple'}}>Old Password</label>
                    <input type="password" className="form-control" onChange={(event) => setOldPassword(event.target.value)} style={{ width: '500px', marginBottom:"20px" }} />

                    <label style={{ fontSize: '2rem', color: 'purple'}}>New Password</label>
                    <input type="password" className="form-control" onChange={(event) => setNewPassword(event.target.value)} style={{ width: '500px', marginBottom:"20px" }} />
                    {errors.password && <div class="form-text" style={{color:"red"}}>{errors.password}</div>}

                    <div className="options" style={{marginTop:"20px"}}>

                    <button className='btn btn-success' onClick={onClickSavePassword}>Save</button>
                    <button className='btn btn-danger' onClick={() => setShowPasswordModal(false)}>Cancel</button>
                    </div>
                </div>
            </div>
        }
        </>
    );
};

export default UserPage;