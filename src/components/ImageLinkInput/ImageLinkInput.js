import React from 'react';
import './ImageLinkInput.css';




const ImageLinkInput = ({onInputChange, onSubmit}) => {
	return (

	<div>
      <p className='f5 center'>
        {'This Magic App will detect faces in your photos. Git it a try.'}
      </p>
        <div className='center'>
          <div className='input center pa3 br3 shadow-5'>
	          <input className='f5 pa2 w-70 center' type='tex' onChange={onInputChange}/>
	          <button className='w-30 grow f5 link ph3 pv2 dib white bg-light-purple' onClick={onSubmit}>Detect</button>
	      </div>
        </div>
    </div>
	);
}

export  {ImageLinkInput};
