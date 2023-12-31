import React, {useState} from 'react';
import {Timeline, Grid, Button, Message} from '@arco-design/web-react';
import EditEventForm from './EditEventForm';
import { useUser } from './UserDetails';

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

function MyEvents({handleDeleteMyEvent, handleUpdateEvent, myEvents}) {
    const {id, description, picture, timestamp, user_id} = myEvents
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
            <Button onClick={handleEditEvent} style = {{left: 134}}>Edit</Button>
            <Button onClick={handleDelete} style = {{left: 134}}>Delete</Button>
        </div>

    return (
        <div>
      
        <Timeline 
            mode={mode} 
            labelPosition='relative' 
            style = {{left: 0,}}
            
        >
        <TimelineItem label={timestamp} >
          <Row style={{ display: 'inline-grid', alignItems: 'stretch', paddingBottom: 10}}>
            <img
              width='40'
              style={imageStyle}
              src= {picture}
            />
            <div style={{alignItems: 'flex-end', width: 400, backgroundColor: 'whitesmoke', border: '1px solid var(--color-border)', gap:10}}>
              {description}
              <div style={{ fontSize: 12, color: '#4E5969', backgroundColor: 'white', position: 'relative'}}>
              {user_id === userDetails.id ? eventButtons : ''}
              {edit ? <EditEventForm handleEditEvent={handleEditEvent} events ={myEvents} handleUpdateEvent={handleUpdateEvent}/> : null}
              </div>
            </div>
          </Row>
        </TimelineItem>
      </Timeline>
    </div>
    )
}

export default MyEvents;