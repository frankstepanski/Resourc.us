const mongoose = require('mongoose');
// testing
const MONGO_USERNAME = 'dylan2040';
const MONGO_PASSWORD = 'dylan2040';
const MONGO_HOSTNAME = 'cluster0.xaxgv.mongodb.net';
// const MONGO_PORT = '27017';
const MONGO_DB = 'Resourc';

const url = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}/`;
// const url = mongodb+srv://ehwyeh:<password>@cluster0.w3qun.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//  const uri ='mongodb+srv://dylan2040:dylan2040@cluster0.xaxgv.mongodb.net/Solo?retryWrites=true&w=majority'

mongoose.connect(url, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: MONGO_DB
})
    .then(() => console.log('Connected to Resourcus DB.'))
    .catch(err => console.log(err));