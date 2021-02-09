// import React, { useState } from 'react';
import { connect } from 'react-redux';

import SignupForm from '../forms/SignupForm';
import { signupAction } from '../../actions/users';

function SignupPage(props) {
	return(
		<div>
			<SignupForm signupAction={props.signupAction} />
		</div>
		)
};

export default connect(null, { 
	signupAction
}) (SignupPage);
