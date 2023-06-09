import React from 'react';

const ChatBox = (props) => {

    const {window,conversationMessages} = props;

    const {messages} = conversationMessages;
    
    return (
        <div className="card" style={{ width: '550px', border: '1px solid #ddd', borderRadius: '5px', padding: '10px' }}>
            <div className="card-body">

                <ul className="list-group">
                    {window.includes("Public") && 
                        <>
                        <h5 className="card-title">{window}</h5>
                        {messages.map((message,index) => {
                            return (
                                <p>{message.message}</p>
                            );
                        })}
                        </>
                    }
                    {!window.includes("Public") && 
                    <>
                        <h5 className="card-title">{window}</h5>
                    </>
                    }

                </ul>

            </div>
        </div>
        
    );
};

export default ChatBox;