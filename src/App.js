import React, { useState } from 'react';
import Home from './components/Home';
import { Link, Route, Switch } from 'react-router-dom';
import Pizza from './components/Pizza';
import Form from './components/Form';
import './App.css';

const App = () => {
	const [orders, setOrders] = useState([]);

	return (
		<div>
			<Switch>
				<Route exact path='/pizza' component={Form} />
				<Route exact path='/'>
					<Home />
				</Route>
			</Switch>
			{orders.map((order) => {
				return (
					<div key={order.id} className='order container'>
						<h4>{order.first_name} your order has been received</h4>
						<h5>{order.size}</h5>
						<h5>{order.toppings}</h5>
						<h5>{order.instructions}</h5>
					</div>
				);
			})}
		</div>
	);
};
export default App;
