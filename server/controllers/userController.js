const { User } = require('../models/userModel');
const session = require('express-session')
const bcrypt = require('bcrypt');
const userController = {};

userController.createUser = (req, res, next) => {
	const requestBody = req.body;
	//	console.log('userController.createUser:', 'reached controller');
	User.create({
		email: requestBody.email,
		hash: requestBody.password,
		firstname: requestBody.firstname,
		lastname: requestBody.lastname,
	})
		.then(data => {
			res.locals.response = data;
			// console.log('userController.createUser:', data);
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
	// console.log('SESSION ID', req.headers.cookie)
	const requestBody = req.body;
	const ssid = req.sessionID
	console.log('req.sessionID:' , req.sessionID)
	console.log('req:', req)
	res.locals.username = requestBody.email;
	// console.log('request body', requestBody)

	// console.log('userController.validateUser:', 'reached controller');
	User.findOne({ email: requestBody.email }).exec()
		.then(data => {
			console.log(data);
			bcrypt.compare(requestBody.password, data.hash, function(err, result) {
				if (result === true) {
					console.log('userController.validateUser:', 'Password comparison is a match');
					User.updateOne({email: requestBody.email }, {sessionid: ssid}, function (err, docs) {
						if (err) {
							console.log(err);
						}
						else {
							console.log("updated docs : ", docs);
							res.locals.sessionID = {ssid:ssid};
						}
						
					});
					
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
	req.session.loggedIn = true;
	req.session.username = res.locals.username 	
	next()
}

userController.getUserInfo =(req, res, next) => {
	const requestBody = {sessionid:JSON.parse(req.params.id)};
	// console.log(requestBody)
	User.findOne(requestBody).exec()
		.then(data => {
			// console.log(data);
			res.locals.userInfo = {
				firstname: data.firstname,
				userId : data._id
			};
			// console.log(res.locals.userInfo);
			next();
		})
		.catch(err => {
			next({
				log: `getUserInfo - ERROR: ${err}`,
				message: { 
					err: 'Error occured in userController.getUserInfo',
					message: err
				}
			}) 
		});
}

userController.getUsername =(req, res, next) => {
	const requestBody = {_id: req.params.id};
	console.log(requestBody)
	User.findOne(requestBody).exec()
		.then(data => {
			// console.log(data);
			res.locals.userInfo = {
				firstname: data.firstname,
				lastname: data.lastname
			};
			// console.log(res.locals.userInfo);
			next();
		})
		.catch(err => {
			next({
				log: `getUsername - ERROR: ${err}`,
				message: { 
					err: 'Error occured in userController.getUsername',
					message: err
				}
			}) 
		});
}

module.exports = userController;