import React from 'react';
import "../css/Loader.css";

const ButtonWithProgress = (props) => {

    const {onClickMethod,pendingApiCall,buttonText,className,disabled} = props;

    let disabledStatement = pendingApiCall;
    if(disabled){
        disabledStatement = disabled;
    }

    return (
        <button className={className} onClick={onClickMethod} disabled={disabled}>
        {pendingApiCall && <div class="loader"></div>}
        {buttonText}
        </button>
    );
};

export default ButtonWithProgress;