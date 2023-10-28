import React from 'react';
import { createContext, useState } from 'react';

// Creating the context for user details
export const userDetailsContext = createContext();


// Within the function create the provider for the context
// Props is passed in and will be used to share the state down
const UserDetailsProvider = (props) => {
    const [userDetails, setUserDetails] = useState();


    return (
        <userDetailsContext.Provider value = {[userDetails, setUserDetails]}>
            {props.children}
        </userDetailsContext.Provider>
    )
}

export default UserDetailsProvider;