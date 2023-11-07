import React from "react";
import { useUser } from "./UserDetails";
import FavEvents from "./FavEvents";


function MyLikes({events, likes}) {
    const [userDetails, setUserDetails] = useUser();
   
    
    const curUserLikes = likes.filter((like) => {
        if (like.user_id === userDetails.id && like.liked === true) {
            return like
        }})
    const mapUserLikes = curUserLikes.map((like) => <FavEvents key = {like.id} likes = {like} events ={events}/>)
    

    return (
        <div>
            {mapUserLikes}
        </div>
    )
}


export default MyLikes;