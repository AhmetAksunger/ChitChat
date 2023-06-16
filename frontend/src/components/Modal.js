import React from 'react';
import "../css/Modal.css"
import { deleteMessage } from '../api/ApiCalls';
const Modal = (props) => {
    const {visible,messageEntity,authState,setModalVisibility} = props;

    const onClickDelete = async () => {
        try {
            await deleteMessage(authState.token, messageEntity.id);
            props.loadConversationMessages(messageEntity.conversationId);   
        } catch (error) {
            console.log(error);
        }
    }
    
    if (!visible) {
      return null;
    }
  
    return (
        <div className="modal">
        <p className="message">Are you sure you want to delete this message?</p>
        <p className="message">"{messageEntity.message}"</p>
        <div className="options">
            <button className="btn btn-danger" onClick={() => {onClickDelete(); props.setModalVisibility(false);}}>Delete</button>
            <button className="btn" onClick={props.onClickCancel}>Cancel</button>
        </div>
        </div>
    );
};

export default Modal;
  