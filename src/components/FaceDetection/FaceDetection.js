import React from 'react';
import './FaceDetection.css';

const FaceDetectionimg = ({imageUrl, box}) => {
	return (
		<div className='center ma'>
		  <div className='absolute mt2'>
			<img id='inputimage' alt='' src={imageUrl} width='500px' heigh='auto'/>
			
		  </div>
		</div>
	);
}


export default FaceDetectionimg;
