import React, { useState } from "react";
import ChatRoom from "./pages/ChatRoom";
import Login from "./pages/Login";
import { HashRouter as Router,Switch } from "react-router-dom";
import { Redirect, Route } from "react-router-dom/cjs/react-router-dom.min";
import Register from "./pages/Register";
import UserPage from "./pages/UserPage";

function App() {

  const [authState,setAuthSate] = useState({
    user:"",
    token:"",
    isLoggedIn: false
  });

  return (
    <Router>
      <Switch>
        <Route exact path={["/","/login"]} render={() => <Login onLoginSuccess={setAuthSate}/>}/>
        <Route exact path="/register" render={() => <Register onLoginSuccess={setAuthSate}/>}/>
        {authState.isLoggedIn && <Route path="/chatroom" render={() => <ChatRoom authState={authState}/>}/>}
        <Route exact path="/user" render={() => <UserPage authState={authState} onLoginSuccess={setAuthSate}/> } />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
