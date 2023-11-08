import React, {useState} from "react";
import {Timeline, Grid, Avatar, Typography} from '@arco-design/web-react';
import { IconHeartFill, IconHeart } from "@arco-design/web-react/icon";
import { useUser } from "./UserDetails";


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


function DisplayLikedEvent({likedEvents, users, userLikes, likes, handleDeleteLike}) {
    const [mode, setMode] = useState('alternate');
    const {id, user_id, timestamp, picture, description} = likedEvents
    const [userDetails, setUserDetails] = useUser();

    console.log(userLikes)
   

    const likesArray = [likes]
    // const eventLikes = likes.filter((like) => like.event_id === id)
    // const trueLikes = eventLikes.filter((like) => like.liked === true)

    
    // gets the like that user_id matches current user and event_id matches clicked event
    const likeToDelete = likesArray.find((like) => like.user_id === userDetails.id && like.event_id === id)
    
    
    const eventLikes = userLikes.filter((like) => like.event_id === id)
    const trueLikes = eventLikes.filter((like) => like.liked === true)
    

    
    const handleDelete = (e) => {
        if (likeToDelete) {
          const likeId = likeToDelete.id 
          fetch(`/likes/${likeId}`, {
            method: 'DELETE',
        })
        .then(res => {
            if (res.status === 204) {
                handleDeleteLike(likeId)
            } else if (res.status === 404) {
                console.error('no like found for user')
            }
        })
        .catch((error) => console.error('Error deleting like: ', error))
          }
    }

    // console.log(user_id)
    
    const eventsUser = users.filter((user) => user.id === user_id)
    // console.log(eventsUser)
    const eventsUsername = eventsUser.map((user) => user.username)
    // console.log(eventsUsername)
    const eventsUserPic = eventsUser.map((user) => user.profile_picture)
    // console.log(eventsUserPic)

    return (
        <div>
            <Timeline 
                mode={mode} 
                labelPosition='relative' 
                style = {{left: 0,}}
                reverse = {false}
            >
            <TimelineItem label={timestamp}>
            <div style={{ position: 'relative', display: 'flex', paddingBottom: 5, backgroundColor: 'whitesmoke', width: 400, border: '1px solid var(--color-border)'}}>
                <Avatar >
                    <img 
                      src ={eventsUserPic}
                    />
                </Avatar>
                <Typography.Text style={{fontSize: 15}}> @{eventsUsername}</Typography.Text>
              </div>
            <Row style={{ display: 'inline-grid', alignItems: 'stretch', position: 'relative', right: 88}}>
                <img
                style={imageStyle}
                src= {picture}
                />
                <div style={{marginBottom: 12, width:400, display: 'flex', position: 'relative', backgroundColor: 'whitesmoke', border: '1px solid var(--color-border)'}}>
                {trueLikes.length}
                <IconHeartFill style = {{fontSize: 25, strokeLinecap: 'round', color: 'red'}} onClick={handleDelete}/>
                <div style = {{alignItems: 'flex-end', width: 250, backgroundColor: 'whitesmoke',}}>
                    {description}
                </div>
                </div>
            </Row>
            </TimelineItem>
        </Timeline>
    </div>
    )
}

export default DisplayLikedEvent;