require('newrelic');
const express = require('express')
const axios = require('axios')

const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Get a home listings data
app.get('/api/listing/:id/data', (req, res) => {
  let id = req.params.id
  axios.get(`http://localhost:3002/api/listing/${id}/data`)
    .then(response => {
      res.send(response.data[0]);
    })
    .catch(err => {
      console.log(err)
    })
});
// Get a agents data
app.get('/api/agents/:id/data', (req, res) => {
  let id = req.params.id
  axios.get(`http://localhost:3002/api/agents/${id}/data`)
    .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      console.log(err)
    })
});
// Post a new listing
app.post('/api/listing', (req, res) => {
  axios.post('http://localhost:3002/api/listing', req.body)
    .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      console.log(err);
    })
})
// Post a new agent
app.post('/api/agents', (req, res) => {
  axios.post('http://localhost:3002/api/agents', req.body)
    .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      console.log(err);
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))