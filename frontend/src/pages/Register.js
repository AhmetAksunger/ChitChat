import React, { useState } from 'react';
import chitChat from "../assets/chitchat.png";
import { login, register } from '../api/ApiCalls';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { useApiProgress } from '../shared/ApiProgress';
import { BASE_URL } from '../shared/BaseUrl';
import { Link } from 'react-router-dom/cjs/react-router-dom';


const Register = (props) => {

    const [registerData,setRegisterData] = useState({
        username:"",
        password:"",
        confirmPassword:""
    });

    const [errors,setErrors] = useState({
        username:"",
        password:"",
        confirmPassword:""
    });

    const pendingApiCall = useApiProgress("post",`${BASE_URL}/api/v1/users`,true);

    const handleValue = (event) => {
        const {name, value} = event.target;
        setRegisterData((previousState) => {
            return {
                ...previousState,
                [name]:value
            };
        });
        setErrors((previousState) => {return {...previousState, [name]:undefined}});
        if(name === "password" && value !== registerData.confirmPassword){
            setErrors((previousState) => {return {...previousState, confirmPassword:"Passwords do not match"}});
        }else if(name === "confirmPassword" && value !== registerData.password){
            setErrors((previousState) => {return {...previousState, confirmPassword:"Passwords do not match"}});
        }else{
            setErrors((previousState) => {return {...previousState, confirmPassword:undefined}});
        }
    }

    const onClickRegister = async () => {
        try {
            const creds = {
                username: registerData.username,
                password: registerData.password
            }
            const response = await register(creds);

            const loginResponse = await login(creds);
            const authState = {
                token: loginResponse.data.token,
                user: loginResponse.data.user,
                authorities: loginResponse.data.authorities,
                isLoggedIn: true
            };
            props.onLoginSuccess(authState);
            props.history.push("/chatroom")
        } catch (error) {
            setErrors((previousState) => {
                return({
                    ...previousState,
                    username: error.response.data.messages.username,
                    password: error.response.data.messages.password
                })
            });
        }
    }
    
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>
          <img src={chitChat} width="400px"/>
          <div style={{ marginBottom: '15px', width: '500px' }}>
            <label className="form-label" style={{fontSize:"2rem",color:"purple"}}>Username</label>
            <input type="text" name="username" className="form-control" placeholder="Username" onChange={handleValue}/>
            {errors.username && <div class="form-text" style={{color:"red"}}>{errors.username}</div>}
          </div>
          <div style={{ marginBottom: '15px', width: '500px' }}>
            <label className="form-label" style={{fontSize:"2rem",color:"purple"}}>Password</label>
            <input type="password" name='password' className="form-control" placeholder="Password" onChange={handleValue}/>
            {errors.password && <div class="form-text" style={{color:"red"}}>{errors.password}</div>}
          </div>
          <div style={{ marginBottom: '15px', width: '500px' }}>
            <label className="form-label" style={{fontSize:"2rem",color:"purple"}}>Confirm Password</label>
            <input type="password" name='confirmPassword' className="form-control" placeholder="Confirm Password" onChange={handleValue}/>
            {errors.confirmPassword && <div class="form-text" style={{color:"red"}}>{errors.confirmPassword}</div>}
          </div>
          <div>
            <ButtonWithProgress className={"btn btn-primary"} onClickMethod={onClickRegister} buttonText={"Register"} pendingApiCall={pendingApiCall} disabled={errors.confirmPassword ||pendingApiCall}/>
            <Link to="/login" style={{fontSize:"1.7rem"}}>Already have an account? Sign in</Link>
          </div>
        </div>
      </div>
    );
};

export default withRouter(Register);