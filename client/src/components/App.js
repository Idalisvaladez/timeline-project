import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";


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
      <Routes>
        {/* <UserDetailsProvider> */}
          <Route path = '/edit-profile' element={<EditProfile />}/>
          <Route path = '/profile' element={<ProfilePage />}/>
          <Route path = '/create' element={<Create />} />
          <Route path = '/home' element={<Home/>} />
          <Route path = '/login' element = {<Login />} />
          <Route path = '/signup' element ={<Signup />} />
          <Route exact path = '/' element = {<Welcome />} />
        {/* </UserDetailsProvider> */}
      </Routes>
    </div>
  )
}

export default App;
