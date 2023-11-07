import React, {useState} from 'react';
import {Timeline, Grid, Message, Avatar, Typography} from '@arco-design/web-react';
import Comments from './Comments';
import CommentForm from './CommentForm';
import { IconHeart, IconHeartFill } from '@arco-design/web-react/icon';


import { useUser } from './UserDetails';
import UserInfo from './UserInfo';
import UserDisplay from './UserDisplay';

const TimelineItem = Timeline.Item;
const { Row, Col } = Grid;

const imageStyle = {
  width: 300,
  height: 300,
}


function Events({events, comments, users, handleAddComment, likes, handleAddLike, handleDeleteLike}) {
    const {id, description, picture, timestamp, user_id} = events
    const [userDetails, setUserDetails] = useUser();
    const [clicked, setClicked] = useState(false);
    const [mode, setMode] = useState('alternate');

    const filteredComments = comments.filter((comment) => comment.event_id === id)
    const displayComments = filteredComments.map((comment) => <Comments key ={comment.id} comments = {comment} users ={users}/>)

    const eventLikes = likes.filter((like) => like.event_id === id)
    const trueLikes = eventLikes.filter((like) => like.liked === true)

    const userLikes = trueLikes.filter((like) => like.user_id === userDetails.id)
    const likeId = userLikes.map((like) =>  like.id)

    const eventsUser = users.filter((user) => user.id === user_id)
    const eventsUsername = eventsUser.map((user) => user.username)
    const eventsUserPic = eventsUser.map((user) => user.profile_picture)
    

    const onClick = (e) => {
      e.preventDefault();
      setClicked(!clicked)
      console.log(clicked)
      // let new_like = {
      //   liked: true,
      //   event_id: id,
      //   user_id: userDetails.id,
      // }
      // fetch("/likes", {
      //     method: 'POST',
      //     headers: {'Content-Type': 'application/json'},
      //     body: JSON.stringify(new_like),
      // })
      // .then(res => {
      //     if (res.status === 201) {
      //         setClicked(!clicked)
      //         return res.json()
      //     } else if (res.status === 400) {
      //         console.error('Error adding like')
      //     }
      // })
      // .then(like => {
      //   handleAddLike(like)
      //   console.log(clicked)
      // })

      // .catch((error) => console.error('Error: ', error));
  }

  
    
  const handleDelete = (e) => {
    setClicked(!clicked)
    console.log(clicked)
    // fetch(`/likes/${likeId[0]}`, {
    //     method: 'DELETE',
    // })
    // .then(res => {
    //     if (res.status === 204) {
    //         handleDeleteLike(likeId[0])
    //     } else if (res.status === 404) {
    //         console.error('no like found for user')
    //     }
    // })
    // .catch((error) => console.error(error))
}
  
  

    return (
        <div>
      
        <Timeline 
            mode={mode} 
            labelPosition='relative' 
            style = {{ padding: 20}}
            reverse = {true}
        >
        <TimelineItem label={timestamp}>
          <div style={{ position: 'relative', display: 'flex', paddingBottom: 5}}>
            <Avatar >
                <img 
                  src ={eventsUserPic}
                />
            </Avatar>
            <Typography.Text style={{fontSize: 15}}> @{eventsUsername}</Typography.Text>
          </div>
          <Row style={{alignItems: 'stretch',}}>
            <img
              width='40'
              style={imageStyle}
              src= {picture}
            />
          </Row>
          <div style={{ marginBottom: 12, width:300, display: 'flex'}}>
                  {trueLikes.length}
                  {clicked ? <IconHeartFill style = {{fontSize: 25, strokeLinecap: 'round', color: 'red'}} onClick={handleDelete}/> : <IconHeart style = {{fontSize: 25, strokeLinecap: 'round'}} onClick={onClick}/> }
                <div style = {{alignItems: 'flex-end', width: 250}}>
                  {description}
                </div>
            </div>
            <div style={{ fontSize: 12, backgroundColor: 'white', overflow: 'scroll', maxHeight: 200, width: 300,}}>
              {displayComments}
            </div>
            <div style={{position: 'relative', paddingTop: 5}}>
              <CommentForm events ={events} handleAddComment={handleAddComment}/>
            </div>
        </TimelineItem>
        
      </Timeline>
    </div>
    )
}

export default Events