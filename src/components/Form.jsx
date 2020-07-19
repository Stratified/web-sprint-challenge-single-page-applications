import React, { useState, useEffect } from 'react';
import Pizza from './Pizza';
import * as yup from 'yup';
import axios from 'axios';

const Form = (props) => {
	const defaultState = {
		name: '',
		special: '',
		size: 'Large',
		toppings: { ham: false, pineapple: false, spinach: false, bacon: false },
	};

	const [errors, setErrors] = useState({ defaultState });
	const [formState, setFormState] = useState(defaultState);
	const [buttonDisabled, setButtonDisabled] = useState(true);

	let formSchema = yup.object().shape({
		name: yup.string().min(2).required('Please provide your name.'),
		special: yup.string(),
		size: yup.string().required('Please select a size.'),
	});

	useEffect(() => {
		formSchema.isValid(formState).then((valid) => setButtonDisabled(!valid));
	}, [formState]);

	const postNewOrder = (newOrder) => {
		axios
			.post('https://reqres.in/api/users', newOrder)
			.then((res) => {
				props.setOrders([...props.orders, res.data]);
				console.log([...props.orders, res.data]);
			})
			.catch((err) => {
				console.log("There's a problem with your order: ", newOrder);
				console.log([...props.orders]);
			});
	};

	const formSubmit = (e) => {
		e.preventDefault();

		const newOrder = {
			name: formState.name,
			size: formState.size,
			toppings: Object.keys(formState.toppings).filter(
				(topping) => formState.toppings[topping] === true
			),
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

	const onCheckboxChange = (e) => {
		const { name } = e.target;
		const { checked } = e.target;

		setFormState({
			...formState,
			toppings: {
				...formState.toppings,
				[name]: checked,
			},
		});
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
		<div style={{ margin: '5%' }}>
			<Pizza
				formState={formState}
				formSubmit={formSubmit}
				errors={errors}
				handleChange={handleChange}
				onCheckboxChange={onCheckboxChange}
				buttonDisabled={buttonDisabled}
			/>
		</div>
	);
};
export default Form;
