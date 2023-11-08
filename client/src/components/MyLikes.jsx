import React from "react";
import { useUser } from "./UserDetails";
import FavEvents from "./FavEvents";


function MyLikes({events, likes, users, handleDeleteLike}) {
    const [userDetails, setUserDetails] = useUser();
   
    console.log(likes)
    const curUserLikes = likes.filter((like) => {
        if (like.user_id === userDetails.id && like.liked === true) {
            return like
        }})
    const mapUserLikes = curUserLikes.map((like) => <FavEvents key = {like.id} likes = {like} events ={events} users={users} userLikes ={likes} handleDeleteLike={handleDeleteLike}/>)
    

    return (
        <div>
            {mapUserLikes}
        </div>
    )
}


export default MyLikes;