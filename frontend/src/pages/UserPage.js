import React, { useEffect, useState } from 'react';
import { getUser, saveProfileImage, updateUser } from '../api/ApiCalls';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { useApiProgress } from '../shared/ApiProgress';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { Link } from 'react-router-dom/cjs/react-router-dom';

const UserPage = (props) => {

    const defaultImage = "https://bootdey.com/img/Content/avatar/avatar6.png"
    const {authState} = props;
    const {token,user} = authState;

    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const [currentUsername,setCurrentUsername] = useState();

    const [newUsername,setNewUsername] = useState();
    const [oldPassword,setOldPassword] = useState();
    const [newPassword,setNewPassword] = useState();
    const [newImage,setNewImage] = useState(defaultImage);
    const [imageAsFile,setImageAsFile] = useState();

    const pendingApiCall = useApiProgress('put',`http://localhost:8080/api/v1/users/${user.id}`,true);

    const [errors,setErrors] = useState({
        username:"",
        image:"",
        password:""

    });

    const loadUser = async () => {
        try {
            const response = await getUser(user.id,token);
            setCurrentUsername(response.data.username);
            if(response.data.profileImage){
                setNewImage(`data:image/jpeg;base64,${response.data.profileImage}`);
            }
        } catch (error) {
            
        }
        
    }

    useEffect(() => {
        loadUser();
    },[]);


    const uploadFile = async (file) => {
        const attachment = new FormData();
        attachment.append('file',file);
        console.log(props.authState.token);
        try {
            const response = await saveProfileImage(attachment,token);            
        } catch (error) {
            setErrors((previousState) => {
                return(
                    {
                        ...previousState,
                        image: error.response.data.messages.image
                    }
                )
            });
        }
    }

    const onChangeFile = (event) => {
        if(event.target.files.length < 1){
            return;
        }
        const file = event.target.files[0];
        const fileReader = new FileReader();
        
        fileReader.onloadend = () => {
            setNewImage(fileReader.result);
        };

        fileReader.readAsDataURL(file);
        setImageAsFile(file);
    }

    const onClickSave = async () => {
        const body = {
            username: newUsername
        };

        if(imageAsFile){
            uploadFile(imageAsFile);
        }
        try {
            await updateUser(user.id,body,token);
            if(newUsername){
                props.onLoginSuccess({
                    user:"",
                    token:"",
                    isLoggedIn: false
                  });
                props.history.push("/login");
            }
        } catch (error) {
            setErrors((previousState) => {
                return(
                    {
                        ...previousState,
                        username: error.response.data.messages.username,
                        image: error.response.data.messages.image
                    }
                )
            });
        }

    };

    const onClickSavePassword = async () => {
        const body = {
            oldPassword: oldPassword,
            newPassword: newPassword
        }
        try {
            await updateUser(user.id,body,token);
            props.onLoginSuccess({
                user:"",
                token:"",
                isLoggedIn: false
              });
            props.history.push("/login");
            
        } catch (error) {
            console.log(error);
            let exception = undefined;
            if(error.response.data.messages){
                exception = error.response.data.messages.newPassword;
            }
            if(error.response.data.message){
                exception = error.response.data.message
            }
            setErrors((previousState) => {
                return(
                    {
                        ...previousState,
                        password:exception
                    }
                )
            });
        }
    }


    return (
        <>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className="modal" style={{height:"700px"}}>
                <img src={newImage} width='256px' height='256px' style={{borderRadius: '50%', marginBottom:"10px"}}/>
                <p className="message">{currentUsername}</p>
      
                <label style={{ fontSize: '2rem', color: 'purple'}}>New Username</label>
                <input type="text" className="form-control" onChange={(event) => setNewUsername(event.target.value)} style={{ width: '500px'}} />
                {errors.username && <div class="form-text" style={{color:"red"}}>{errors.username}</div>}


                <label style={{ fontSize: '2rem', color: 'purple', marginTop:"20px"  }}>Choose a profile picture</label>
                <input type="file" className="form-control" onChange={onChangeFile} style={{ width: '500px'}} />
                {errors.image && <div class="form-text" style={{color:"red"}}>{errors.image}</div>}
                

                <a style={{marginTop:"10px",cursor:"pointer"}} onClick={() => setShowPasswordModal(true)}>Want to change your password?</a>
                <div className="options" style={{marginTop:"20px"}}>
                    <ButtonWithProgress onClickMethod={onClickSave} pendingApiCall={pendingApiCall} buttonText={"Save"} className={"btn btn-success"}/>
                    <Link className='btn btn-danger' to="/chatroom">Cancel</Link>
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

                    <ButtonWithProgress onClickMethod={onClickSavePassword} pendingApiCall={pendingApiCall} buttonText={"Save"} className={"btn btn-success"}/>
                    <button className='btn btn-danger' onClick={() => setShowPasswordModal(false)}>Cancel</button>
                    </div>
                </div>
            </div>
        }
        </>
    );
};

export default withRouter(UserPage);