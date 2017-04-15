const path = require('path');
const express = require('express');

const app = express();

const PORT = 9090;

app.get('/', (req, res) => {
	console.log("hey")
  	res.sendFile(__dirname + '/index.html');
});


app.get('/api/users', (req, res) => {
  	res.json(['Ana', 'Ori'])
});

app.listen(PORT, 'localhost', err => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${PORT}`);
});