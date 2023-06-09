import React, { useState } from "react";
import ChatRoom from "./components/ChatRoom";
import Login from "./pages/Login";
import { HashRouter as Router,Switch } from "react-router-dom";
import { Route } from "react-router-dom/cjs/react-router-dom.min";

function App() {

  const [authState,setAuthSate] = useState({
    user:"",
    token:""
  });

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Login onLoginSuccess={setAuthSate}/>}/>
        <Route path="/chatroom" render={() => <ChatRoom authState={authState}/>}/>
      </Switch>
    </Router>
  );
}

export default App;
