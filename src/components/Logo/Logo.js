import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import Face from './Face.png'

const Logo = () => {
	return(
		<div className='ma4 mt0'>
			<Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: '8em', width:'8em'}} >
			<div className="Tilt-inner"><img className='w-100 h-100' alt='logo' src ={Face}/></div>
			</Tilt>
		</div>
	);
}

export default Logo;