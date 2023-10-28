import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";


import UserDetailsProvider from "./UserDetails";
import Welcome from '../layout/Welcome';
import Signup from '../layout/Signup';
import Login from "../layout/Login";
import Navbar from "../layout/Navbar";
import Home from '../layout/Home';
import Create from "../layout/Create";
import ProfilePage from "../layout/ProfilePage";
import EditProfile from "../layout/EditProfile";


function App() {



  console.log(sessionStorage.getItem('currentUser'))


  return (
    <div>
      {/* <Navbar /> */}
      <Switch>
        {/* <UserDetailsProvider> */}
          <Route path = '/edit-profile'>
            <EditProfile />
          </Route>
          <Route path = '/profile'>
            <ProfilePage />
          </Route>
          <Route path = '/create'>
            <Create />
          </Route>
          <Route path = '/home'>
            <Home />
          </Route>
          <Route path = '/login'>
            <Login />
          </Route>
          <Route path = '/signup'>
            <Signup />
          </Route>
          <Route exact path = '/'>
            <Welcome />
          </Route>
        {/* </UserDetailsProvider> */}
      </Switch>
    </div>
  )
}

export default App;
