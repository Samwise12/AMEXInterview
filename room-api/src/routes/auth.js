import express from 'express';
import User from '../models/User';

const router = express.Router();

router.post('/', (req, res) => {
	const { userEmail, userPassword } = req.body.credentials.userData;
	
	User.findOne({email: userEmail }).then(user => {
		if (user && user.isValidPassword(userPassword)) {
			console.log("USER IS:",user);
			res.json({ user });
		} else {
			res.status(400).json({ errors: { global: "Invalid credentials" } });
		}
	})	
})

export default router;