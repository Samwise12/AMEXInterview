import api from '../api';

export const signupAction = data => dispatch => 
	api.user.signup(data).then(user => {
	 // dispatch(userLoggedIn(user));
	 console.log("THIS WAS user api HIT!");
	});
