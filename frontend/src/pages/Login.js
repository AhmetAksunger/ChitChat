import React, { useState } from 'react';
import { login } from '../api/ApiCalls';
import { loginSuccess } from '../redux/authActions';
import { useHistory, withRouter } from 'react-router-dom/cjs/react-router-dom.min';


const Login = (props) => {
    
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const onClickLogin = async () => {
        const creds = {
            username: username,
            password: password
        }
        try {
            const response = await login(creds);
            const authState = {
                token: response.data.token,
                user: response.data.user
            }
            props.onLoginSuccess(authState);
            props.history.push("/chatroom")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='container'>
            <div class="mb-3">
                <label class="form-label">Username</label>
                <input type="text" class="form-control" placeholder="Username" onChange={(event) => {setUsername(event.target.value)}}/>
            </div>
            <div class="mb-3">
                <label class="form-label">Password</label>
                <input type="password" class="form-control" placeholder="Password" onChange={(event) => {setPassword(event.target.value)}}/>
            </div>
            <button className='btn btn-primary' onClick={onClickLogin}>Login</button>
        </div>
    );
};

export default withRouter(Login);