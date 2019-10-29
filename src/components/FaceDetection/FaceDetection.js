import React from 'react';
import './FaceDetection.css';

const FaceDetectionimg = ({imageUrl, box}) => {
	return (
		<div className ='mt4 center'>
			<div className = 'relative'>
			<img id='inputimg' alt ='' src={imageUrl} width='500em' height='auto'/>
			<div className='bounding-box' style={{top: box.topRow, right: box.rightcolum, bottom:box.bottomRow, left:box.leftcolum}}></div>
			</div>
		</div>
	);
}


export default FaceDetectionimg;
