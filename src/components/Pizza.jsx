import React from 'react';

const Pizza = (props) => {
	const {
		formState,
		handleChange,
		onCheckboxChange,
		formSubmit,
		buttonDisabled,
		errors,
	} = props;
	return (
		<div>
			<form onSubmit={formSubmit}>
				<input
					type='text'
					name='name'
					placeholder='Name'
					label='Name: '
					errors={errors}
					value={formState.name}
					onChange={handleChange}
				/>
				<br />
				<br />
				<label htmlFor='pizzaSize'>
					Pizza size:
					<select id='size' name='size' onChange={handleChange}>
						<option value='Large'>Large</option>
						<option value='Medium'>Medium</option>
						<option value='Small'>Small</option>
					</select>
				</label>
				<br />
				<br />
				<div>
					<label>
						Ham
						<input
							type='checkbox'
							name='ham'
							checked={formState.toppings.ham}
							onChange={onCheckboxChange}
						/>
					</label>
					<label>
						Pineapple
						<input
							type='checkbox'
							name='pineapple'
							checked={formState.toppings.pineapple}
							onChange={onCheckboxChange}
						/>
					</label>
					<label>
						Spinach
						<input
							type='checkbox'
							name='spinach'
							checked={formState.toppings.spinach}
							onChange={onCheckboxChange}
						/>
					</label>
					<label>
						Bacon
						<input
							type='checkbox'
							name='bacon'
							checked={formState.toppings.bacon}
							onChange={onCheckboxChange}
						/>
					</label>
					<br />
					<br />
					<input
						type='text'
						name='special'
						label='Special instructions: '
						value={formState.special}
						onChange={handleChange}
					/>
					<br />
					<br />
				</div>
				<button disabled={buttonDisabled}>Submit</button>
			</form>
		</div>
	);
};

export default Pizza;
