const mongoose = require('mongoose');
const express = require('express');
const Order = require('../orders/order.model');
const Movie = require('../movies/movie.model');
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();

        const totalSales = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: "$totalPrice" },
                }
            }
        ]);

        const trendingMoviesCount = await Movie.aggregate([
            { $match: { trending: true } },
            { $count: "trendingMoviesCount" }
        ]);

        const trendingMovies = trendingMoviesCount.length > 0 ? trendingMoviesCount[0].trendingMoviesCount : 0;
        const totalMovies = await Movie.countDocuments();
        const monthlySales = await Order.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                    totalSales: { $sum: "$totalPrice" },
                    totalOrders: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        const trendingPercentage = totalMovies > 0 ? ((trendingMovies / totalMovies) * 100).toFixed(2) : 0;

        res.status(200).json({
            totalOrders,
            totalSales: totalSales[0]?.totalSales.toFixed(2) || 0,
            trendingMovies,
            totalMovies,
            monthlySales,
            trendingPercentage
        });

    } catch (error) {
        console.error("Error fetching admin stats:", error);
        res.status(500).json({ message: "Failed to fetch admin stats" });
    }
})

module.exports = router;