import express from 'express';
import 'babel-polyfill';
import path from 'path';
import bodyParser from 'body-parser';
if (process.env.NODE_ENV !== 'production'){
	const dotenv = require('dotenv');
}

import mongoose from 'mongoose';
import mongodb from 'mongodb';
import Promise from 'bluebird';
import cors from 'cors';
import morgan from 'morgan';

if (process.env.NODE_ENV !== 'production'){require('dotenv').config()}
	const PORT = process.env.PORT || 5000;

import users from './routes/users';
import auth from './routes/auth';

const app = express();
// app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

mongoose.Promise = Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const dbUrl = process.env.MONGODB_URI || process.env.MONGODB_URL;

mongoose.connect(dbUrl,
 { useNewUrlParser: true, useUnifiedTopology: true }).then(
 () => {console.log('mongodb running local mongodb')},
 err => {console.log('error!:', err)}
 );

app.use('/api/auth', auth);
app.use('/api/users', users);

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));    
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

