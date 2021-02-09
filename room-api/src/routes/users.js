import express from 'express';

import User from '../models/User';
import parseErrors from '../utils/parseErrors';

const router = express.Router();

router.post('/', (req, res) => {
	// console.log(req.body);
	const { userEmail, userPassword } = req.body.user.userData;
	console.log("userEmail", userEmail, "userPassword",userPassword);
	const user = new User({ email: userEmail,
	 theme: {floor: "blue", sofa: "blue", wall: "beige", curtain: "green"} 
	});
	user.setPassword(userPassword);
	console.log("USER IS:", user);
	// user.setConfirmationToken();	
	user.save((err,user) => {
		if(err) {
			res.status(400).json({ errors: parseErrors(err.errors) });
			return err
		};
		res.send(user);		
	} )
})

router.put('/',(req, res) => {
	// console.log("HIT!", req.body.data)
	const { email } = req.body.data;
	const { colorData } = req.body.data.colors;
	// console.log(email, colorData);

User.findOneAndUpdate({ email }, {theme: colorData}, {upsert: true}, function(err, doc) {
    if (err) return res.send(500, {error: err});
    return res.send('Succesfully saved.');
	});
})

export default router;
