import React from 'react';

const Pizza = (props) => {
	return (
		<div>
			<label htmlFor='name'>
				{props.label}
				<input {...props} />
			</label>
		</div>
	);
};

export default Pizza;
