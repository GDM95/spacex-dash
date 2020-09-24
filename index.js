const express = require('express');
const path = require('path');
const axios = require('axios').default;
const http = require('http');
var Twitter = require("twitter-v2")

const generatePassword = require('password-generator');


const { pastLaunchQuery, upcomingLaunchesQueryMin, pastLaunchesQueryMin } = require('./queries/launches')
const LAUNCHES_QUERY = 'https://api.spacexdata.com/v4/launches/query'


const app = express();

/******** Tweet Stream ********/
console.log("Open socket")
var server = http.createServer(app);
// Pass a http.Server instance to the listen method
var io = require('socket.io').listen(server);

// The server should start listening
server.listen(80);

// Expose the node_modules folder as static resources (to access socket.io.js in the browser)
app.use('/static', express.static('node_modules'));

// Handle connection
io.on('connection', function (socket) {
    console.log("Connected succesfully to the socket ...");

    const client = new Twitter({
        consumer_key: '7E0bPVr4s8Wc8Am1mzEjiB3Cj',
        consumer_secret: 'TzOSPrOD36WZVpY5XVMMip4uhKey55YyKsJpIWBIj1wGPheCws',
        access_token: '1306779814171488258-dUIwgy43T8KXpDBfYeIu5ej9HbOE5P',
        access_token_secret: '6DOB46l3hSgSzQASBkABFF0uJ32Z2PaCW59APYjVSk3am'
    });

    function emitTweets() {
        const getTweet = async() => {
            const { data } = await client.get('https://api.twitter.com/2/users/by/username', { username: 'elonmusk' });
            console.log(data);
            socket.emit('tweets', data)
        }
        
        getTweet()


    }

    emitTweets()

});

/*************************/


// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.json()); // to support JSON-encoded bodies (POST params)

// Put all API endpoints under '/api'
app.get('/api/passwords', (req, res) => {
    const count = 5;

    // Generate some passwords
    const passwords = Array.from(Array(count).keys()).map(i =>
      generatePassword(12, false)
    )
  
    // Return them as json
    res.json(passwords);
  
    console.log(`Sent ${count} passwords`);
});

// past launches
app.post('/api/launches/past', (req, res, next) => {
    axios.post(LAUNCHES_QUERY, pastLaunchesQueryMin)
       .then(resp => res.send(resp.data))
       .catch(err => res.secn(err));
});

// planned launches
app.post('/api/launches/upcoming', (req, res, next) => {
    axios.post(LAUNCHES_QUERY, upcomingLaunchesQueryMin)
       .then(resp => res.send(resp.data))
       .catch(err => res.secn(err));
});

// single launch from flight number
app.post('/api/launches/single', (req, res, next) => {
    console.log("param: ", req.body)
    axios.post(LAUNCHES_QUERY, pastLaunchQuery(req.body.flight_number))
       .then(resp => res.json(resp.data))
       .catch(err => res.secn(err));
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});








const port = process.env.PORT || 5000;
app.listen(port);

console.log(`SpaceX Dash listening on ${port}`);