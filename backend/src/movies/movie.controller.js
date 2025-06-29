const Movie = require("./movie.model");

const postAMovie = async (req, res) => {
    try {
        const newMovie = await Movie({...req.body});
        await newMovie.save();
        res.status(200).send({
            message: "Movie created successfully", movie: newMovie
        });
    } catch (error) {
        console.error("Error creating movie:", error);
        res.status(500).send({ message: "Failed to create movie" }); 
    }
};

const getAllMovies = async (req, res) => { 
    try {
        const movies = await Movie.find().sort({ createdAt: -1 });
        if (movies.length === 0) {
            return res.status(404).send({ message: "No movies found" });
        }
        res.status(200).send(movies);

    } catch (error) {
        console.error("Error fetching movies:", error);
        res.status(500).send({ message: "Failed to fetch movies" });
    }
}

const getSingleMovie = async (req, res) => { 
    try {
        const {id} = req.params;
        const movie = await Movie.findById(id);
        if (!movie) {
            return res.status(404).send({ message: "Movie not found" });
        }
        res.status(200).send(movie);

    } catch (error) {
        console.error("Error fetching movies:", error);
        res.status(500).send({ message: "Failed to fetch movies" });
    }
}  

const updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedMovie) {        
            return res.status(404).send({ message: "Movie not found" });
        }       
        res.status(200).send({ message: "Movie updated successfully", movie: updatedMovie });
    } catch (error) {
        console.error("Error updating movie:", error);
        res.status(500).send({ message: "Failed to update movie" });
    }
}

const deleteAMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMovie = await Movie.findByIdAndDelete(id);
        if (!deletedMovie) {
            return res.status(404).send({ message: "Movie not found" });
        }
        res.status(200).send({ message: "Movie deleted successfully", movie: deletedMovie });  
        
    } catch (error) {
        console.error("Error deleting movie:", error);
        res.status(500).send({ message: "Failed to delete movie" });
    }
}

module.exports = {
    postAMovie, 
    getAllMovies,
    getSingleMovie,
    updateMovie,
    deleteAMovie
}