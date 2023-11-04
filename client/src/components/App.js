import React, { useEffect, useState } from "react";
import { Route, Routes} from "react-router-dom";



import Welcome from '../layout/Welcome';
import Signup from '../layout/Signup';
import Login from "../layout/Login";
import Home from '../layout/Home';
import Create from "../layout/Create";
import ProfilePage from "../layout/ProfilePage";
import EditProfile from "../layout/EditProfile";


function App() {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);


  useEffect(() => {
    fetch('/events')
      .then((res) => res.json())
      .then((data) => {
        setEvents(data)
      });
  }, []);


  useEffect(() => {
    fetch('/users')
    .then((res) => res.json())
    .then(data => setUsers(data))
  }, [])

 
  useEffect(() => {
    fetch('/comments')
    .then((res) => res.json())
    .then((comments) => {
      setComments(comments)
    })
  }, [])

  const handleAddEvent = (new_event) => {
    setEvents([...events, new_event])
  }

  const handleDeleteMyEvent = (deletedEvent) => {
    const updatedEvents = events.filter((event) => event.id !== deletedEvent.id)
    setEvents(updatedEvents)
  }

  const handleUpdateEvent = (edited_event) => {
    const edited_events = events.map((event) => {
      if (event.id === edited_event.id) {
        console.log('edit from App.js', edited_event)
        return edited_event
      } else {
        console.log('returning event from App.js')
        return event
      }
    })
    console.log('after the handle update')
    setEvents(edited_events)
  }

  const handleAddComment = (new_comment) => {
    setComments([...comments, new_comment])
  }

  return (
    <div>
      {/* <Navbar /> */}
        <Routes>
          <Route path = '/edit-profile' element={<EditProfile />}/>
          <Route path = '/profile' element={<ProfilePage 
                                              events = {events} 
                                              comments={comments} 
                                              handleDeleteMyEvent={handleDeleteMyEvent} 
                                              handleAddEvent={handleAddEvent}
                                              handleUpdateEvent={handleUpdateEvent}
                                              />}/>
          <Route path = '/create' element={<Create events = {events} users = {users} comments = {comments} />}/>
          <Route path = '/home' element={<Home 
                                            events = {events} 
                                            users = {users} 
                                            comments = {comments} 
                                            handleAddEvent = {handleAddEvent}
                                            handleDeleteMyEvent={handleDeleteMyEvent}
                                            handleAddComment ={handleAddComment} 
                                          />} />
          <Route path = '/login' element = {<Login />} />
          <Route path = '/signup' element ={<Signup />} />
          <Route exact path = '/' element = {<Welcome />} />
        </Routes>
    </div>
  )
}

export default App;
