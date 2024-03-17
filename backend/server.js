const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const projectRoutes = require('./routes/projectroute')

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => 
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

// routes
app.use('/api/project', projectRoutes)

app.listen(5000); // start Node + Express server on port 5000
