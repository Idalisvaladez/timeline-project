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
  const [events, setEvents] = useState([]);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);


  useEffect(() => {
    fetch('/events')
      .then((res) => res.json())
      .then((data) => {
        setEvents(data)
      });
  }, []);

  useEffect(() => {
    fetch('/comments')
    .then((res) => res.json())
    .then(data => setComments(data))
  }, [])

  useEffect(() => {
    fetch('/users')
    .then((res) => res.json())
    .then(data => setUsers(data))
  }, [])



  return (
    <div>
      {/* <Navbar /> */}
      <UserDetailsProvider>
        <Routes>
          <Route path = '/edit-profile' element={<EditProfile />}/>
          <Route path = '/profile' element={<ProfilePage />}/>
          <Route path = '/create' element={<Create />} />
          <Route path = '/home' element={<Home events = {events} comments = {comments} users = {users}/>} />
          <Route path = '/login' element = {<Login />} />
          <Route path = '/signup' element ={<Signup />} />
          <Route exact path = '/' element = {<Welcome />} />
        </Routes>
      </UserDetailsProvider>
    </div>
  )
}

export default App;
