const express = require('express')
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

const movieRoutes = require('./src/movies/movie.route');
const orderRoutes = require('./src/orders/order.route');
const userRoutes = require('./src/users/user.route');
const adminRoutes = require('./src/stats/admin.stats');

app.use("/api/movies", movieRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/auth", userRoutes)
app.use("/api/admin", adminRoutes)

async function main() {
    await mongoose.connect(process.env.DB_URL);
    app.use('/', (req, res) => {
        res.send('MovieNest server is running!');
    })
}

main().then(() => console.log("MongoDB connected successfully!")).catch(err => console.log(err));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});