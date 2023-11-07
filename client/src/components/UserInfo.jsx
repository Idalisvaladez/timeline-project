import React, {useState} from "react";
import { Avatar, Typography, Button } from "@arco-design/web-react";
import { useUser } from "./UserDetails";
import { useNavigate } from "react-router-dom";
import UserDisplay from "./UserDisplay";

function UserInfo({users}) {
    const [userDetails, setUserDetails] = useUser();
    const navigate = useNavigate();

    const curUser = users.filter((user) => user.id === userDetails.id)
    const curPic = curUser.map((user) =>  user.profile_picture)
    const curUsername = curUser.map((user) => user.username)
    



    return (
        <div style={{display: 'flex'}}>
            <Avatar size={150} style={{alignItems:'center', justifyContent: 'center', marginRight: '16px', border: '1px', left: 10}}>
                <img
                    alt={curUsername}
                    src={curPic}
                />
            </Avatar>
            <Typography.Title style={{justifyContent: 'right'}}>@{curUsername}</Typography.Title> 
            <Button style={{justifyContent: 'space-between', margin: 30,}} onClick={ () => {navigate('/edit-profile') }}>Edit</Button>
        </div>
    )
}

export default UserInfo;