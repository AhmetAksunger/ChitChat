import React from 'react';

const ChatBox = (props) => {

    const {privateMessages, publicMessages, window, addOfflineUser} = props;

    if(window !== "PUBLIC" && !privateMessages.has(window)){
        addOfflineUser(window);
        return (alert("wanna start a new convo with " + window))
    }

    return (
        <div className="card" style={{ width: '550px', border: '1px solid #ddd', borderRadius: '5px', padding: '10px' }}>
            <div className="card-body">

                <ul className="list-group">
                    {window==="PUBLIC" && 
                        <>
                        <h5 className="card-title">Public Chat</h5>

                            {publicMessages.map((data, index) => {
                                return (
                                <>
                                    <label>{data.senderName}</label>
                                    <li key={index} className="list-group-item">{data.message}</li>
                                </>
                                );
                            })}
                        </>
                    }
                    {window!=="PUBLIC" && 
                    <>
                        {[...privateMessages.get(window)].map((data,index) => {
                            return (
                            <li className="list-group-item" key={index}>{data.message}</li>
                            );
                        })}
                    </>
                    }

                </ul>

            </div>
        </div>
    );
};

export default ChatBox;