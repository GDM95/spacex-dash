const express = require('express');
const path = require('path');
const axios = require('axios').default;

const { pastLaunchQuery, upcomingLaunchesQueryMin, pastLaunchesQueryMin } = require('./queries/launches')
const LAUNCHES_QUERY = 'https://api.spacexdata.com/v4/launches/query'


const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));


// Put all API endpoints under '/api'
app.get('/api/passwords', (req, res) => {
  const count = 5;

  console.log(`Sent ${count} passwords`);
});


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`SpaceX Dash listening on ${port}`);