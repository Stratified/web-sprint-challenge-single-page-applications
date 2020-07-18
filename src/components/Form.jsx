import React, { useState, useEffect } from 'react';
import Pizza from './Pizza';
import * as yup from 'yup';
import axios from 'axios';

const Form = (props) => {
	const defaultState = {
		name: '',
		special: '',
		size: 'Large',
		pineapple: false,
		ham: false,
		spinach: false,
		bacon: false,
	};

	const [errors, setErrors] = useState([]);
	const [formState, setFormState] = useState(defaultState);
	const [buttonDisabled, setButtonDisabled] = useState(true);

	let formSchema = yup.object().shape({
		name: yup.string().min(2).required('Please provide your name.'),
		special: yup.string(),
		size: yup.string().required('Please select a size.'),
		pineapple: yup.boolean(),
		ham: yup.boolean(),
		spinach: yup.boolean(),
		bacon: yup.boolean(),
	});

	useEffect(() => {
		formSchema.isValid(formState).then((valid) => setButtonDisabled(!valid));
	}, [formState]);

	const postNewOrder = (newOrder) => {
		axios
			.post('https://reqres.in/api/users', newOrder)
			.then((res) => {
				props.setOrders([...props.orders, res.data]);
			})
			.catch((err) => {
				console.log("There's a problem with your order: ", newOrder);
			});
	};

	const formSubmit = (e) => {
		e.preventDefault();

		const newOrder = {
			name: formState.name,
			size: formState.size,
			pineapple: Object.keys(formState.pineapple),
			ham: Object.keys(formState.ham),
			spinach: Object.keys(formState.spinach),
			bacon: Object.keys(formState.bacon),
			special: formState.special,
		};
		postNewOrder(newOrder);
		console.log(newOrder);
	};

	const validateChange = (e) => {
		e.persist();
		yup
			.reach(formSchema, e.target.name)
			.validate(e.target.value)
			.then((valid) =>
				setErrors({
					...errors,
					[e.target.name]: '',
				})
			)
			.catch((error) =>
				setErrors({
					...errors,
					[e.target.name]: error.errors[0],
				})
			);
	};

	const handleChange = (e) => {
		const value =
			e.target.type === 'checkbox' ? e.target.checked : e.target.value;
		setFormState({
			...formState,
			[e.target.name]: value,
		});
		validateChange(e);
	};

	return (
		<div>
			<form onSubmit={formSubmit} style={{ margin: '5%', fontSize: '1.4rem' }}>
				<Pizza
					type='text'
					name='name'
					placeholder='Name'
					label='Name: '
					errors={errors}
					value={formState.name}
					onChange={handleChange}
				/>
				<br />
				<label htmlFor='pizzaSize'>
					Pizza size:
					<select id='size' name='size' onChange={handleChange}>
						<option value='Large'>Large</option>
						<option value='Medium'>Medium</option>
						<option value='Small'>Small</option>
					</select>
					<br />
					<br />
				</label>
				<label htmlFor='pinapple'>
					<input name='pineapple' type='checkbox' onChange={handleChange} />
					Pineapple
				</label>
				<label htmlFor='ham'>
					<input name='ham' type='checkbox' onChange={handleChange} />
					Ham
				</label>
				<label htmlFor='spinach'>
					<input name='spinach' type='checkbox' onChange={handleChange} />
					Spinach
				</label>
				<label htmlFor='bacon'>
					<input name='bacon' type='checkbox' onChange={handleChange} />
					Bacon
				</label>
				<br />
				<br />
				<Pizza
					type='text'
					name='special'
					label='Special instructions: '
					errors={errors}
					value={formState.special}
					onChange={handleChange}
				/>
				<br />
				<button disabled={buttonDisabled}>Submit</button>
			</form>
		</div>
	);
};

export default Form;
