import React, { useEffect, useState } from 'react';
import BackButton from './BackButton';

const Header = ({atHome, username}) => {
    
    // Logged in state
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleAuthClick = () => {setIsLoggedIn(!isLoggedIn);};
    
    return (
        <div className='bg-yellow-500 rounded-md flex justify-between items-center p-4'>
        { atHome ? (
            <div>Hi, {username}!</div>
        ) : (
            <div><BackButton /></div>
        )}
        <div className='text-2xl font-bold'>PayDay</div>
        <button 
            className="bg-white text-yellow-500 font-semibold py-2 px-4 rounded" 
            onClick={handleAuthClick}>
            {isLoggedIn ? 'Log Out' : 'Log In'}
        </button>
        </div>

    )};

export default Header;