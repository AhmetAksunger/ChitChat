import React from 'react';
import "../css/Loader.css";

const ButtonWithProgress = (props) => {

    const {onClickMethod,pendingApiCall,buttonText,className} = props;

    return (
        <button className={className} onClick={onClickMethod} disabled={pendingApiCall}>
        {pendingApiCall && <div class="loader"></div>}
        {buttonText}
        </button>
    );
};

export default ButtonWithProgress;