import React, {useState} from 'react';
import { Timeline, Grid } from '@arco-design/web-react';

const TimelineItem = Timeline.Item;
const { Row, Col } = Grid;

const imageStyle = {
  width: 200,
  height: 200,
}


function Events({events, comments}) {
    const {description, picture, timestamp} = events
    const [mode, setMode] = useState('alternate');
    //console.log(events)


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
            <div style={{ marginBottom: 12, width:200, }}>
              {description}
              <div style={{ fontSize: 12, color: '#4E5969' }}>{comments}</div>
            </div>
          </Row>
          <TimelineItem>

          </TimelineItem>
        </TimelineItem>
      </Timeline>
    </div>
    )
}

export default Events