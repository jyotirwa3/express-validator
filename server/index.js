const express = require('express');
const rateLimit = require('rate-limiter-flexible');
const mongoose = require('mongoose');

const app = express();
const userRoutes = require('./routes/userRoutes');
const rateLimiter = new rateLimit.RateLimiterMemory({
  points: 1, // Number of requests
  duration: 1, // Per second
});

app.use((req, res, next) => {
  rateLimiter.consume(req.ip)
    .then(() => next())
    .catch(() => res.status(429).send('Too Many Requests'));
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(express.json());
app.use(express.urlencoded({extended:true}))

// Routes
app.use('/api/users', userRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/MERN')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


app.listen(5000, () => {
  console.log('Server running on port 3000');
});