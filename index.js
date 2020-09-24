const express = require('express');
const path = require('path');
const axios = require('axios').default;
const generatePassword = require('password-generator');


const { pastLaunchQuery, upcomingLaunchesQueryMin, pastLaunchesQueryMin } = require('./queries/launches')
const LAUNCHES_QUERY = 'https://api.spacexdata.com/v4/launches/query'


const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));


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

app.post('/api/launches/past', (req, res, next) => {
    axios.post(LAUNCHES_QUERY, pastLaunchesQueryMin)
       .then(resp => res.send(resp.data))
       .catch(err => res.secn(err));
});

app.post('/api/launches/upcoming', (req, res, next) => {
    axios.post(LAUNCHES_QUERY, upcomingLaunchesQueryMin)
       .then(resp => res.send(resp.data))
       .catch(err => res.secn(err));
});

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