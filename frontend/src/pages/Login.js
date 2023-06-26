import React, { useState } from 'react';
import { login } from '../api/ApiCalls';
import { Link, useHistory, withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import chitChat from "../assets/chitchat.png";
import "../css/Loader.css";
import { useApiProgress } from '../shared/ApiProgress';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { BASE_URL } from '../shared/BaseUrl';

const Login = (props) => {
    
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const [error,setError] = useState({
      message:""
    });

    const pendingApiCall = useApiProgress("post",`${BASE_URL}/api/v1/auth`);

    const onClickLogin = async () => {
        const creds = {
            username: username,
            password: password
        }
        try {
            const response = await login(creds);
            const authState = {
                token: response.data.token,
                user: response.data.user,
                authorities: response.data.authorities,
                isLoggedIn: true
            }
            props.onLoginSuccess(authState);
            props.history.push("/chatroom")
        } catch (error) {
          if(error.response.data){
            setError(error.response.data);
          }
        }
    }

    const onClickEnter = (event) => {
      if(event.key === "Enter"){
        onClickLogin();
      }
    }
    
    return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>
        <img src={chitChat} width="400px"/>
        <div style={{ marginBottom: '15px', width: '500px' }}>
          <label className="form-label" style={{fontSize:"2rem",color:"purple"}}>Username</label>
          <input type="text" className="form-control" placeholder="Username" onChange={(event) => { setUsername(event.target.value); setError({message:""}) }} />
        </div>
        <div style={{ marginBottom: '15px', width: '500px' }}>
          <label className="form-label" style={{fontSize:"2rem",color:"purple"}}>Password</label>
          <input type="password" className="form-control" placeholder="Password" onChange={(event) => { setPassword(event.target.value); setError({message:""}) }} onKeyDown={onClickEnter}/>
        </div>
        {error.message && 
        <div class="text-white text-center" style={{height:"30px",backgroundColor:"red",margin:'5px',marginLeft:'0px',marginRight:'0px'}}>
        {error.message}
        </div>
        }
        <div>
          <ButtonWithProgress className={"btn btn-info"} onClickMethod={onClickLogin} pendingApiCall={pendingApiCall} buttonText={"Login"} />
          <Link className='btn btn-primary' to="/register">Register</Link>
        </div>
      </div>
    </div>

    );
};

export default withRouter(Login);