import React from "react";
import MyEvents from "./MyEvents";
import { useUser } from "./UserDetails";


function EventsList({events, handleDeleteMyEvent, handleUpdateEvent}) {
    const [userDetails, setUserDetails] = useUser()


    const filterMyEvents = events.filter((event) => event.user_id === userDetails.id)
    const displayMyEvents = filterMyEvents.map((event) => <MyEvents key = {event.id} myEvents ={event} handleDeleteMyEvent={handleDeleteMyEvent} handleUpdateEvent={handleUpdateEvent}/>)

    if (displayMyEvents.length === 0) {
        return (
            <div style={{ background: 'rgb(240,255,255)', textAlign: 'center', padding: '30px', overflow: 'scroll'}}>
                <strong style={{fontFamily: 'Acme', fontSize: '80px'}}>No Events</strong>
            </div>
        )
    } else {
        return (
            <div style={{ background: 'rgb(240,255,255)', textAlign: 'center', padding: '30px', overflow: 'scroll'}}>
                {displayMyEvents}
            </div>
        )
    }
}


export default EventsList;