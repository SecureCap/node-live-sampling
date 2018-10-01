const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const routes = require('./routes')
const PORT = process.env.PORT || 3001
const User = require('./models/User')


// Setup passport
require('./config/passport')

// Setup body parser and cookie parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve up static assets
app.use(express.static('client/build'))

//You can use the Express router that is bundled with this module to answer calls to /s3/sign
// app.use('/s3', require('react-s3-uploader/s3router')({
//     bucket: "DevShops",
//     region: 'us-east-1', //optional
//     signatureVersion: 'v4', //optional (use for some amazon regions: frankfurt and others)
//     headers: {'Access-Control-Allow-Origin': '*'}, // optional
//     ACL: 'private', // this is default
//     uniquePrefix: true // (4.0.2 and above) default is true, setting the attribute to false preserves the original filename in S3
// }));

// Setup routes
app.use(routes);

// Connect to mongo and set it up to use promises
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/node-live-sampling',
    {
        useNewUrlParser: true
    }
)

// Start API server
app.listen(PORT, () => console.log(`API Server now listening on PORT ${PORT}`))
