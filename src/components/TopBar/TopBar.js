import React from 'react';

import ProfileIcon from '../Profile/ProfileIcon';



const TopBar = ({onRouteChange, isSignedIn, toggleModal}) => {
	if(isSignedIn === true) {
	    return (
			<nav style={{display:'flex', justifyContent:'flex-end'}}>
				<ProfileIcon onRouteChange={onRouteChange} toggleModal={toggleModal} />
			</nav>
         );
    } else {
    	return ( 
			<nav style={{display:'flex', justifyContent:'flex-end'}}>
				<p onClick={() => onRouteChange('signin')} className='f4 link dim black underline pa3 pointer'> Sign In </p>
				<p onClick={() => onRouteChange('Register')} className='f4 link dim black underline pa3 pointer'> Register </p>
			</nav>
	    )
    }
}

export default TopBar;