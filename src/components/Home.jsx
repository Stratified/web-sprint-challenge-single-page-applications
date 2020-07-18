import React from 'react';
import { Link } from 'react-router-dom';

const Home = (props) => {
	return (
		<div>
			<h1>Welcome to the home page!</h1>
			<Link to='/pizza'>Pizza form.</Link>
		</div>
	);
};

export default Home;
