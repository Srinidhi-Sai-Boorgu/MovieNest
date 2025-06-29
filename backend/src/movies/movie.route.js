const express = require('express');
const Movie = require('./movie.model');
const { postAMovie, getAllMovies, getSingleMovie, updateMovie, deleteAMovie } = require('./movie.controller');
const verifyAdminToken = require('../middleware/verifyAdminToken');
const router = express.Router();

router.post('/create-movie', verifyAdminToken, postAMovie)

router.get("/", getAllMovies)

router.get("/:id", getSingleMovie)

router.put("/edit/:id", verifyAdminToken, updateMovie)

router.delete("/:id", verifyAdminToken, deleteAMovie)

module.exports = router;