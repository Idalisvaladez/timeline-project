import React, {useState} from 'react';
import {Timeline, Grid, Button, Message} from '@arco-design/web-react';
import EditEventForm from './EditEventForm';
import { useUser } from './UserDetails';

const TimelineItem = Timeline.Item;
const { Row, Col } = Grid;

const imageStyle = {
  width: 300,
  height: 300,
}

function MyEvents({events, comments, handleDeleteMyEvent, handleUpdateEvent}) {
    const {id, description, picture, timestamp, user_id} = events
    // const {comment, event_id, user_id} = comments
    const [mode, setMode] = useState('alternate');
    const [edit, setEdit] = useState(false);
    const [userDetails, setUserDetails] = useUser();

    
    
    const handleDelete = (e) => {
        fetch(`/events/${id}`, {
            method: 'DELETE',
        })
        .then(res => {
            if (res.status === 204) {
                Message.success('Event delete successful')
                handleDeleteMyEvent(id)
            } else if (res.status === 404) {
                Message.error('Error deleting')
                console.error('no event found')
            }
        })
        .catch((error) => console.error(error))
    }


    const handleEditEvent = (e) => {
        setEdit(!edit)
    }
    
    const eventButtons = 
        <div>
            <Button onClick={handleEditEvent}>Edit</Button>
            <Button onClick={handleDelete}>X</Button>
        </div>

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
              {user_id === userDetails.id ? eventButtons : ''}
              {edit ? <EditEventForm handleEditEvent={handleEditEvent} events ={events} handleUpdateEvent={handleUpdateEvent}/> : null}
              <div style={{ fontSize: 12, color: '#4E5969' }}></div>
            </div>
          </Row>
        </TimelineItem>
      </Timeline>
    </div>
    )
}

export default MyEvents;