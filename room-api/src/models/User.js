import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';

const schema = new mongoose.Schema({
	email: {
		type: String, 
		required: true,
		lowercase:true,
		index: true,
		unique: true
	},
	passwordHash: {type: String, required: true},
	theme: {
		floor: String,
		sofa: String,
		wall: String,
		curtain: String		
	}
}, 
	{ timestamps: true, 
	  writeConcern: {
          j: true,
          wtimeout: 1000
        } },
    
);

schema.methods.isValidPassword = function isValidPassword(password) {
	return bcrypt.compareSync(password, this.passwordHash)
};

schema.methods.setPassword = function setPassword(password) {
	this.passwordHash = bcrypt.hashSync(password, 10);
};


schema.methods.toAuthJSON = function toAuthJSON() {
	return {
		email: this.email,
	}
};

schema.plugin(uniqueValidator, { message: 'This email is already taken '});

export default mongoose.model('User', schema);


