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
  const [likes, setLikes] = useState([]);


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


  useEffect(() => {
    fetch('/likes')
    .then((res) => res.json())
    .then((likes) => {
      setLikes(likes)
    })
  }, [])

  const handleAddEvent = (new_event) => {
    setEvents([...events, new_event])
  }

  const handleDeleteMyEvent = (id) => {
    const updatedEvents = events.filter((event) => event.id !== id)
    setEvents(updatedEvents)
  }

  const handleUpdateEvent = (edited_event) => {
    const edited_events = events.map((event) => {
      if (event.id === edited_event.id) {
        // console.log('edit from App.js', edited_event)
        return edited_event
      } else {
        // console.log('returning event from App.js')
        return event
      }
    })
    setEvents(edited_events)
  }

  const handleUpdateUser = (edited_user) => {
    const edited_users = users.map((user) => {
      if (user.id === edited_user.id) {
        return edited_user
      } else {
        return user
      }
    })
    setUsers(edited_users)
  }
 

  const handleAddComment = (new_comment) => {
    setComments([...comments, new_comment])
  }

  const handleAddLike = (new_like) => {
    setLikes([...likes, new_like])
  }

  const handleDeleteLike = (id) => {
    const updatedLike = likes.filter((like) => like.id !== id)
    setLikes(updatedLike)
  }



  return (
    <div>
      {/* <Navbar /> */}
        <Routes>
          <Route path = '/edit-profile' element={<EditProfile users={users} handleUpdateUser={handleUpdateUser}/>}/>
          <Route path = '/profile' element={<ProfilePage 
                                              events = {events} 
                                              comments={comments} 
                                              likes ={likes}
                                              users={users}
                                              handleDeleteMyEvent={handleDeleteMyEvent} 
                                              handleAddEvent={handleAddEvent}
                                              handleUpdateEvent={handleUpdateEvent}
                                              handleDeleteLike={handleDeleteLike}
                                              />}/>
          <Route path = '/create' element={<Create events = {events} users = {users} comments = {comments} />}/>
          <Route path = '/home' element={<Home 
                                            events = {events} 
                                            users = {users} 
                                            comments = {comments} 
                                            likes ={likes}
                                            handleAddEvent = {handleAddEvent}
                                            handleDeleteMyEvent={handleDeleteMyEvent}
                                            handleAddComment ={handleAddComment} 
                                            handleAddLike={handleAddLike}
                                            handleDeleteLike={handleDeleteLike}
                                          />} />
          <Route path = '/login' element = {<Login />} />
          <Route path = '/signup' element ={<Signup />} />
          <Route exact path = '/' element = {<Welcome />} />
        </Routes>
    </div>
  )
}

export default App;
