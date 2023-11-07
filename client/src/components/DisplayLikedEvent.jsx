import React, {useState} from "react";
import {Timeline, Grid} from '@arco-design/web-react';
import { IconHeartFill, IconHeart } from "@arco-design/web-react/icon";


const TimelineItem = Timeline.Item;
const { Row, Col } = Grid;

const imageStyle = {
  width: 300,
  height: 300,
}


function DisplayLikedEvent({likedEvents}) {
    const [mode, setMode] = useState('alternate');
    const [clicked, setClicked] = useState(true);

   
    

    // const filteredComments = comments.filter((comment) => comment.event_id === id)
    // const displayComments = filteredComments.map((comment) => <Comments key ={comment.id} comments = {comment} users ={users}/>)

    // const eventLikes = likes.filter((like) => like.event_id === id)
    // const trueLikes = eventLikes.filter((like) => like.liked === true)

    // const userLikes = trueLikes.filter((like) => like.user_id === userDetails.id)
    // const likeId = userLikes.map((like) =>  like.id)
    
    console.log(clicked)

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

  console.log(clicked)
    
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

    console.log(likedEvents)

    return (
        <div>
            <Timeline 
                mode={mode} 
                labelPosition='relative' 
                style = {{left: 0,}}
                reverse = {false}
            >
            <TimelineItem label={likedEvents.timestamp}>
            <Row style={{ display: 'inline-grid', alignItems: 'stretch' }}>
                <img
                width='40'
                style={imageStyle}
                src= {likedEvents.picture}
                />
                <div style={{ marginBottom: 12, width:300, }}>
                {clicked ? <IconHeartFill style = {{fontSize: 25, strokeLinecap: 'round', color: 'red'}} onClick={handleDelete}/> : <IconHeart style = {{fontSize: 25, strokeLinecap: 'round'}} onClick={onClick}/> }
                {likedEvents.description}
                </div>
            </Row>
            </TimelineItem>
        </Timeline>
    </div>
    )
}

export default DisplayLikedEvent;