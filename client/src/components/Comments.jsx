import React, {useState, useContext} from 'react';
import { List, Input } from '@arco-design/web-react';
import UserDisplay from './UserDisplay';
import { useUser } from '../components/UserDetails';

import {
  IconHeart,
  IconMessage,
  IconHeartFill,
  IconStarFill,
  IconStar,
} from '@arco-design/web-react/icon';



function Comments({comments, users}) {
    const [likes, setLikes] = useState([]);
    const [userDetails, setUserDetails] = useUser();
    const {id, event_id, user_id, timestamp, comment} = comments
   

    
    const filteredUser = users.filter((user) => user.id === user_id)
    const userInfo = filteredUser.map((user) => <UserDisplay key = {user.id} users = {user} comments = {comments} timestamp = {timestamp}/>)
    

    return (
        <List bordered={true} >
          <List.Item key ={id} style={{overflow: 'scroll'}}>
            {userInfo}
          </List.Item>
        </List>
    )
}

export default Comments;