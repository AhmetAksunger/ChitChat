import React from 'react';
import { resetPublicChats } from '../api/ApiCalls';
import { useState } from 'react';

const AdminPage = (props) => {
    const [success,setSuccess] = useState(false);

    const onClickReset = async () => {
        console.log("here")
        console.log(props.authState);
        try {
            await resetPublicChats(props.authState.token);
            setSuccess(true);
        } catch (error) {
            console.log(error);
        }
        
    }
    return (
        <div className='text-center'>
            <label className="form-label" style={{fontSize:"2rem",color:"purple",marginTop:"10px"}}>Reset Public Chats</label>
            <div>
                <button className='btn btn-danger' onClick={onClickReset}>Reset</button>
            </div>
            <div>
                {success && <label className="form-label" style={{fontSize:"2rem",color:"green",marginTop:"5px"}}>Success</label>}
            </div>
        </div>
    );
};

export default AdminPage;