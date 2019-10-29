import React from 'react';




const TopBar = ({onRouteChange, isSignedIn}) => {
	if(isSignedIn === true) {
	    return (
			<nav style={{display:'flex', justifyContent:'flex-end'}}>
				<p onClick={() => onRouteChange('signin')} className='f4 link dim black underline pa3 pointer'> Sign Out </p>
			</nav>
         );
    } else {
    	return ( <nav style={{display:'flex', justifyContent:'flex-end'}}>
				<p onClick={() => onRouteChange('signin')} className='f4 link dim black underline pa3 pointer'> Sign In </p>
				<p onClick={() => onRouteChange('Register')} className='f4 link dim black underline pa3 pointer'> Register </p>
			</nav>
	    )
    }
}

export default TopBar;