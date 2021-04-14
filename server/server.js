const express = require('express');
const cors = require('cors')
const app = express();
const path = require('path');
const db = require('./models/db');
const session = require('express-session')


const userRouter = require('./routes/user');
const teamRouter = require('./routes/team');
const resourceRouter = require('./routes/resource');
const commentsRouter = require('./routes/comments')

const PORT = 3000;

app.use(cors())

// HANDLE ASSETS
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.use(session({
    secret:'Keep it secret',
    name:'uniqueSessionID',
    saveUninitialized:true}));
app.use('/user', userRouter);
app.use('/teams', teamRouter);
app.use('/resource', resourceRouter);
app.use('/comments', commentsRouter)

// Renders index.html with static assets
app.use(express.static(path.join(__dirname, '../dist')));
// app.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname, '../dist/index.html'), function (err) {
//         if (err) {
//             res.status(500).send(err)
//         }
//     })
// })

app.get('/', function (req, res) {
    if (req.session.loggedIn) {
        console.log("req.session:", req.session);
        res.redirect('/teams');
    } else {
        console.log("req.session:", req.session);
        res.sendFile(path.join(__dirname, '../dist/index.html'));
    }
})

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 500,
        message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.status, errorObj.message);
    return res.status(errorObj.status).send(errorObj.message.err);
});

// RUN SERVER
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}...`);
});