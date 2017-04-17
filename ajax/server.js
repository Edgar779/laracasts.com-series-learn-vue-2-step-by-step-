const express = require('express');
const app = express();
const PORT = 9090;
const bodyParser = require('body-parser');

app.use(bodyParser.json({ extended: true }));

require('./modules/index')( app );

// Sending main layout
app.get('/', (req, res) => {
  	res.sendFile(__dirname + '/index.html');
});

// Launching the server
app.listen(PORT, 'localhost', err => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${PORT}`);
});