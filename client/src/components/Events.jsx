import React, {useState} from 'react';
import {Timeline, Grid } from '@arco-design/web-react';
import Comments from './Comments';
import CommentForm from './CommentForm';

const TimelineItem = Timeline.Item;
const { Row, Col } = Grid;

const imageStyle = {
  width: 300,
  height: 300,
}


function Events({events, comments, users, handleAddComment}) {
    const {id, description, picture, timestamp} = events
    const [mode, setMode] = useState('alternate');

    const filteredComments = comments.filter((comment) => comment.event_id === id)
    const displayComments = filteredComments.map((comment) => <Comments key ={comment.id} comments = {comment} users ={users}/>)

    

    return (
        <div>
      
        <Timeline 
            mode={mode} 
            labelPosition='relative' 
            style = {{left: 0,}}
            reverse = {true}
        >
        <TimelineItem label={timestamp}>
          <Row style={{ display: 'inline-grid', alignItems: 'stretch' }}>
            <img
              width='40'
              style={imageStyle}
              src= {picture}
            />
            <div style={{ marginBottom: 12, width:300, }}>
              {description}
              <div style={{ fontSize: 12, color: '#4E5969', overflow: 'scroll', maxHeight: 200,}}>{displayComments}</div>
              <CommentForm events ={events} handleAddComment={handleAddComment}/>
            </div>
          </Row>
        </TimelineItem>
      </Timeline>
    </div>
    )
}

export default Events