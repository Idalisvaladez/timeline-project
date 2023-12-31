import React from "react";
import DisplayLikedEvent from "./DisplayLikedEvent";


function FavEvents({likes, events, users, userLikes, handleDeleteLike}) {


    const userLikedEvents = events.filter((event) => {
        if (event.id === likes.event_id){
            return event
        }})
    
    const displayLikedEvents = userLikedEvents.map((event) => <DisplayLikedEvent key= {event.id} likedEvents = {event} users={users} userLikes={userLikes} handleDeleteLike={handleDeleteLike} likes = {likes}/>)
    

        console.log(userLikes)
        
    if (userLikedEvents.length === 0) {
        return (
            <div style={{ background: 'rgb(240,255,255)', textAlign: 'center', padding: '30px', overflow: 'scroll'}}>
                <strong style={{fontFamily: 'Acme', fontSize: '80px'}}>No Liked Events</strong>
            </div>
        )
    } else {
        return (
            <div style={{ background: 'rgb(240,255,255)', textAlign: 'center', padding: '30px', overflow: 'scroll'}}>
                {displayLikedEvents}
            </div>
        )
    }
}


export default FavEvents;