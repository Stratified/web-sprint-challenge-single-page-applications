import React, { useState } from 'react';
import Home from './components/Home';
import { Link, Route, Switch } from 'react-router-dom';
import Form from './components/Form';
import './App.css';

const App = () => {
	const [orders, setOrders] = useState([]);

	return (
		<div>
			<Switch>
				<Route exact path='/pizza'>
					<Form orders={orders} setOrders={setOrders} />
				</Route>
				<Route exact path='/'>
					<Home />
				</Route>
			</Switch>
			{orders.map((order) => {
				return (
					<div key={order.id}>
						<h2>Success!</h2>
						<h2>Name: {order.name}</h2>
						<h2>Size: {order.size}</h2>
						<h2>Toppings: {order.toppings}</h2>
						<h2>Extra Instructions: {order.special}</h2>
					</div>
				);
			})}
		</div>
	);
};
export default App;
