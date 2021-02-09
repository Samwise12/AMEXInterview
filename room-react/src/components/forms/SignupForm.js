import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";

import { Form, Button } from 'semantic-ui-react';
import isEmail from 'validator/lib/isEmail';
import InlineError from '../messages/InlineError';

function SignupForm (props) {
	const [ user, setUser ] = useState({userData: {userEmail: '',userPassword: ''}});
	const [ loading, setLoading ] = useState({loading: false});
	const [ errors, setErrors ] = useState({});	
	let history = useHistory();
	const handleChange = e => {
		setUser({userData: {...user.userData ,[e.target.name]: e.target.value}});
	};	
	const onSubmit = e => {
		e.preventDefault();		
		const errorsSubmit = validate(user.userData);	
		console.log("errorsSubmit",errorsSubmit);			
		setErrors(errorsSubmit);
		console.log("errors", errors);		
		if (Object.keys(errors).length === 0) {
			setLoading({ loading: true });
			props.signupAction(user)
				.then(()=> history.push("/"))	
				.catch(err => {
					console.log("ERROR SIGNUPFORM", err);
					setErrors({ errors: err.response});
					setLoading({loading: false});
				}
				 )
		}

		console.log("HIT!!?", errors) 
		// props.loginAction(user);
	};	
	const validate = data => {
		const errors = {};

		if (!isEmail(data.userEmail)) errors.email = "Invalid email";
		if (!data.userPassword) errors.password = "Can't be blank";
		console.log("errors valid", errors);
		return errors;
	}	
	return(
			<div>			
				<Form onSubmit={onSubmit} loading={loading.loading}>
					<Form.Field error={!!errors.email}>
					<label htmlFor="email">Email</label>
					<input
						type="email"
						id="email"
						name="userEmail"
						placeholder="email@email.com"
						value={user.userData.userEmail}
						onChange={handleChange}
						/>
						{errors.email && <InlineError text={errors.email} />}
					</Form.Field>

					<Form.Field error={!!errors.password}>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						name="userPassword"
						value={user.userData.userPassword}
						onChange={handleChange}
						/>
					</Form.Field>

					<Button primary>Sign Up</Button>
				</Form>
			</div>
		)
}

SignupForm.propTypes = {
	signupAction: PropTypes.func.isRequired
}

export default SignupForm;