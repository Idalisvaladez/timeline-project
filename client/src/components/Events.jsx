import React, {useState, useEffect} from 'react';
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
  width: 400,
  height: 400,
  overflow: 'hidden',
  objectFit: 'contain',
  border: '1px solid var(--color-border)',
  backgroundColor: 'white',
}


function Events({events, comments, users, handleAddComment, likes, handleAddLike, handleDeleteLike}) {
    const {id, description, picture, timestamp, user_id} = events
    const [userDetails, setUserDetails] = useUser();
    const [mode, setMode] = useState('alternate');
    const [clicked, setClicked] = useState(false);
    const [trueLikes, setTrueLikes] = useState([]);

  

    const filteredComments = comments.filter((comment) => comment.event_id === id)
    const displayComments = filteredComments.map((comment) => <Comments key ={comment.id} comments = {comment} users ={users}/>)

    // Fetch and filter true likes when component mounts
    useEffect(() => {
      const eventLikes = likes.filter((like) => like.event_id === id);
      const filteredTrueLikes = eventLikes.filter((like) => like.liked === true);
      setTrueLikes(filteredTrueLikes);
    }, [likes, id])
    

    // gets the like that user_id matches current user and event_id matches clicked event
    const likeToDelete = likes.find((like) => like.user_id === userDetails.id && like.event_id === id)

    // for the user_id of the liked data to compare to current user
    const likesUser = trueLikes.map((like) => like.user_id)
    
    

    //for event post user info
    const eventsUser = users.filter((user) => user.id === user_id)
    const eventsUsername = eventsUser.map((user) => user.username)
    const eventsUserPic = eventsUser.map((user) => user.profile_picture)


    const onClick = (e) => {
      e.preventDefault();
      
      // Check if the user already liked the post
      const hasUserLiked = trueLikes.some((like) => like.user_id === userDetails.id);
      if (!hasUserLiked) {
        let new_like = {
          liked: true,
          event_id: id,
          user_id: userDetails.id,
        }
      fetch("/likes", {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(new_like),
      })
      .then(res => {
          if (res.status === 201) {
              return res.json()
          } else if (res.status === 400) {
              console.error('Error adding like')
          }
      })
      .then(like => {
        handleAddLike(like)
        setTrueLikes([...trueLikes, like])
        setClicked(true)
        localStorage.setItem('clicked', true);
      })
      .catch((error) => console.error('Error: ', error));
    } else {
      console.log('User already liked this post');
    }
  }

  
    
  const handleDelete = (e) => {
    if (likeToDelete) {
      const likeId = likeToDelete.id 
      fetch(`/likes/${likeId}`, {
        method: 'DELETE',
    })
    .then(res => {
        if (res.status === 204) {
            handleDeleteLike(likeId)
            setClicked(false)
            localStorage.removeItem('clicked');
        } else if (res.status === 404) {
            console.error('no like found for user')
        }
    })
    .catch((error) => console.error('Error deleting like: ', error))
      }
}
  
  

    return (
        <div style = {{justifyContent: 'center'}}>
      
        <Timeline 
            mode={mode} 
            labelPosition='relative' 
            style = {{ padding: 20}}
            reverse = {true}
        >
              <TimelineItem key={id}label={timestamp}>
              <div style={{ position: 'relative', display: 'flex', paddingBottom: 5, backgroundColor: 'whitesmoke', width: 400, border: '1px solid var(--color-border)'}}>
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
              <div style={{ marginBottom: 12, width:400, display: 'flex', position: 'relative', backgroundColor: 'whitesmoke', border: '1px solid var(--color-border)'}}>
                      {trueLikes.length}
                      {clicked ? <IconHeartFill style = {{fontSize: 25, strokeLinecap: 'round', color: 'red'}} onClick={handleDelete}/> : <IconHeart style = {{fontSize: 25, strokeLinecap: 'round'}} onClick={onClick}/> }
                    <div style = {{alignItems: 'flex-end', width: 250, backgroundColor: 'whitesmoke',}}>
                      {description}
                    </div>
                </div>
                <div style={{ fontSize: 12, backgroundColor: 'white', overflow: 'scroll', maxHeight: 200, width: 400, position: 'relative',}}>
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