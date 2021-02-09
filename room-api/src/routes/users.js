import express from 'express';

import User from '../models/User';
import parseErrors from '../utils/parseErrors';

const router = express.Router();

router.post('/', (req, res) => {
	const { userEmail, userPassword } = req.body.user.userData;
	const user = new User({ email: userEmail,
	 theme: {floor: "blue", sofa: "blue", wall: "beige", curtain: "green"} 
	});
	user.setPassword(userPassword);
	user.save((err,user) => {
		if(err) {
			res.status(400).json({ errors: parseErrors(err.errors) });
			return err
		};
		res.send(user);		
	} )
})

router.put('/',(req, res) => {
	const { email } = req.body.data;
	const { colorData } = req.body.data.colors;

User.findOneAndUpdate({ email }, {theme: colorData}, {upsert: true}, function(err, doc) {
    if (err) return res.send(500, {error: err});
    return res.send('Succesfully saved.');
	});
})

export default router;
