import React from 'react';

const Rank = ({name, entries}) => {
	return(
		<div className='white f5'>
			<div className='center'>
				{`${name}, your current entry count is...`}
			</div>
			<div className='center f3' >
				{entries}
			</div>
		</div>
	);
}

export default Rank;