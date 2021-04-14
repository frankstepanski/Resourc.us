const { User } = require('../models/userModel');
const session = require('express-session')
const bcrypt = require('bcrypt');
const userController = {};

userController.createUser = (req, res, next) => {
	const requestBody = req.body;
	console.log('userController.createUser:', 'reached controller');
	User.create({
		email: requestBody.email,
		hash: requestBody.password,
		firstname: requestBody.firstname,
		lastname: requestBody.lastname,
	})
		.then(data => {
			res.locals.response = data;
			console.log('userController.createUser:', data);
			next();
		})
		.catch(err => {
			next({
				log: `createUser - ERROR: ${err}`,
				message: { 
					err: 'Error occured in userController.createUser',
					message: err
				}
			}) 
		});
}

userController.validateUser = (req, res, next) => {
	console.log('SESSION ID', req.headers.cookie)
	const requestBody = req.body;
	res.locals.username = requestBody.email;
	console.log('request body', requestBody)

	console.log('userController.validateUser:', 'reached controller');
	User.findOne({ email: requestBody.email }).exec()
		.then(data => {
			console.log(data);
			bcrypt.compare(requestBody.password, data.hash, function(err, result) {
				if (result === true) {
					console.log('userController.validateUser:', 'Password comparison is a match');
					next();
				} else {
					console.log('userController.validateUser:', 'Password doesnt match');
					next({
						log: `validateUser - ERROR: Password doesn't match`,
						message: { 
							err: 'Error occured in userController.bcrypt',
							message: 'Password does not match'
						}	
					}) 
				}
			})
			
		})
		.catch(err => {
			next({
				log: `validateUser - ERROR: ${err}`,
				message: { 
					err: 'Error occured in userController.validateUser',
					message: err
				}
			}) 
		});
}

userController.sessionUser = (req, res, next) => {
	console.log('Look Here', req)
	req.session.loggedIn = true;
	req.session.username = res.locals.username 
	console.log (req.session);
	res.redirect('/teams/list')
	next()
}


module.exports = userController;