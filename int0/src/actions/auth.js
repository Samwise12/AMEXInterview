import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../types';
import api from '../api';

export const userLoggedIn = user => ({
	type: USER_LOGGED_IN,
	user
})

export const userLoggedOut = user => ({
	type: USER_LOGGED_OUT
})

export const loginAction = credentials => dispatch => 
	api.user.login(credentials).then(user => {
		// console.log("user",user);
		dispatch(userLoggedIn(user));
		}).catch(e => console.log("User login issue", e));

export const logoutAction = () => dispatch => {
	dispatch(userLoggedOut());
	}
