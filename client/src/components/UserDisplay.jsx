import React, { useState } from "react";
import {Avatar, Comment, Button} from '@arco-design/web-react';
import { useUser } from "./UserDetails";

function UserDisplay({users, comments, timestamp}) {
    const {id, email, name, username, profile_picture} = users
    const {comment, user_id} = comments

   
    
   

    return (
      <div>
        <Comment
        author={username}
        avatar={
          <Avatar>
            <img
              alt={username}
              src={profile_picture}
            />
          </Avatar>
        }
        content={<div>{comment}</div>}
        datetime={timestamp}
        />
        </div>

    )
}

export default UserDisplay;