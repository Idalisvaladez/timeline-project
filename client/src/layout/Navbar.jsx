import React from 'react';
import {Link} from 'react-router-dom';


function Navbar() {

    return (
        <div className = 'navbar'>
            <Link to = '/home'>Home</Link>
            <Link to = '/profile'>Profile</Link>
            <Link to = '/create'>Create</Link>
            <Link to = '/signup'>Signup</Link>
            <Link to = '/login'>Login</Link>
        </div>
    )
}

export default Navbar;