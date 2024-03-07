// server.js
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
// Body parser middleware
app.use(bodyParser.json());


// MongoDB URI
const MONGODB_URI = 'mongodb://localhost:27017/alfredinho';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// User Model
const User = require('../src/model/user');

// Routes
app.post('/api/users', (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    // Otros campos del usuario
  });

  newUser.save()
    .then(user => res.json(user))
    .catch(err => console.log(err));
});

app.put('/api/users/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(user => res.json(user))
    .catch(err => console.log(err));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
