const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/login',
    userController.validateUser, userController.sessionUser,
    (req, res) => {
        //console.log('sessionID', res.locals.sessionID);
        res.status(200).json({sessionID:req.sessionID});
    }
);

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {});
    res.send('Thank you! Visit again!')
})

// router.get('/login/:random',
//     (req,res) => {
//         console.log(req.params);
//         res.status(200).json({})
//     }
// );

router.get('/:id', 
    userController.getUserInfo,
    (req, res) => {
        // console.log('before sending',res.locals.userInfo);
        res.status(200).json(res.locals.userInfo);
    }
)

router.get('/name/:id', 
    userController.getUsername,
    (req, res) => {
        // console.log('before sending',res.locals.userInfo);
        res.status(200).json(res.locals.userInfo);
    }
)

router.post('/create',
    userController.createUser, 
    (req, res) => {
        console.log('login User router is working');
        console.log(res.locals.response);
        res.status(200).json(res.locals.response);
    }
);

module.exports = router;