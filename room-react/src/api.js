import axios from 'axios';
// eslint-disable-next-line
export default {
	user: {
		login: credentials =>
			axios.post('/api/auth', { credentials })
				 .then(res => res.data.user).catch(e => console.log(e)),
		signup: user => 
			axios.post("/api/users", { user }).then(res => res.data.user)
	},
	theme: {
		saveTheme: data => axios.put('/api/users', { data }).catch(e => console.log(e))
	}
};