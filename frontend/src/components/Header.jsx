import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router-dom for Link
import { AiOutlineEdit } from 'react-icons/ai'; // Assuming you're using react-icons for AiOutlineEdit
import BackButton from './BackButton';

const Header = ({ atHome, username }) => {
    
    // Logged in state
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userDisplay, setUserDisplay] = useState(username);
    const [editUser, setEditUser] = useState("n");

    const handleAuthClick = () => setIsLoggedIn(!isLoggedIn);
    const handleEditClick = () => setEditUser("y");
    const handleSaveClick = () => setEditUser("n");

    return (
        <div className='bg-yellow-500 rounded-md flex justify-between items-center p-4'>
            {atHome ? (
                <div className='flex'>
                    {editUser === "n" ? (
                        <div className='text-1xl'> Hi, {userDisplay}! </div>
                    ) : (
                        <div className='flex'>
                            <input 
                                type='text' 
                                value={userDisplay} 
                                onChange={(e) => setUserDisplay(e.target.value)} 
                                className='border-1 border-gray-500 px-4 py-0' 
                            />
                            <button className='p-2 bg-sky-300 m-8' onClick={handleSaveClick}> Save </button>
                        </div>
                    )}
                    {editUser === "n" && (
                        <Link onClick={handleEditClick}>
                            <AiOutlineEdit className='text-2xl text-yellow-600' />
                        </Link>
                    )}
                </div>
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
    );
};

export default Header;
