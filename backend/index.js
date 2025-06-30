require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://movienest-six.vercel.app'
    ],
    credentials: true
}));

const movieRoutes = require('./src/movies/movie.route');
const orderRoutes = require('./src/orders/order.route');
const userRoutes = require('./src/users/user.route');
const adminRoutes = require('./src/stats/admin.stats');

app.use("/api/movies", movieRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/auth", userRoutes)
app.use("/api/admin", adminRoutes)

app.get('/', (req, res) => res.send('MovieNest server is running!'));

mongoose
    .connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

module.exports = app;

if (require.main === module) {
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
        console.log(`Local server listening on http://localhost:${port}`);
    });
}
