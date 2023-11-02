import React from 'react';
import { createContext, useState, useContext, useEffect } from 'react';

// Creating the context for user details
export const userDetailsContext = createContext();


// Within the function create the provider for the context
// Props is passed in and will be used to share the state down
const UserDetailsProvider = (props) => {
    const [userDetails, setUserDetails] = useState(null);


        // Load user details from local storage during initialization
    useEffect(() => {
        const storedUserDetails = localStorage.getItem('userDetails');
        if (storedUserDetails) {
        setUserDetails(JSON.parse(storedUserDetails));
        }
    }, []);

    // Save user details to local storage whenever userDetails change
    useEffect(() => {
        if (userDetails) {
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
        }
    }, [userDetails]);


    return (
        <userDetailsContext.Provider value = {[userDetails, setUserDetails]}>
            {props.children}
        </userDetailsContext.Provider>
    )
}

export default UserDetailsProvider;

export function useUser() {
    return useContext(userDetailsContext);
  }