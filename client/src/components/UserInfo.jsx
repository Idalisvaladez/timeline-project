import React, {useState} from "react";
import { Avatar, Typography, Button } from "@arco-design/web-react";
import { useUser } from "./UserDetails";

function UserInfo() {
    const [userDetails, setUserDetails] = useUser();

    

    return (
        <div style={{display: 'flex'}}>
            {/* <Avatar size={150} style={{alignItems:'center', justifContent: 'center', marginRight: '16px', border: '1px'}}>{userPic}</Avatar>
            <Typography.Title style={{justifyContent: 'right'}}>@{userDetails.username}</Typography.Title>
            <Button style={{}}>Edit</Button> */}
        </div>
    )
}

export default UserInfo;