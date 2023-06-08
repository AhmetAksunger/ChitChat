import React, { useState } from "react";
import ChatRoom from "./components/ChatRoom";
import Login from "./pages/Login";

function App() {

  const [authState,setAuthSate] = useState({
    user:"",
    token:""
  });

  return (
    <>
    <Login onLoginSuccess={setAuthSate}/>
    <ChatRoom authState={authState}/>
    </>
  );
}

export default App;
