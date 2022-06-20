const express = require("express")
const moviesBL = require("../BLs/moviesBL")
const router = express.Router()

//Controller for the movies

//get all
router.route("/").get(async (req, resp) => {
	let data = await moviesBL.getAllMovies()
	return resp.json(data)
})

//get by id
router.route("/:id").get(async (req, resp) => {
	let movieId = req.params.id
	let data = await moviesBL.getMovieById(movieId)
	return resp.json(data)
})

//add
router.route("/").post(async (req, resp) => {
	let newMovie = req.body
	let data = await moviesBL.addMovie(newMovie)
	return resp.json(data)
})

//update
router.route("/:id").put(async (req, resp) => {
	let movieId = req.params.id
	let updateMovie = req.body
	let status = await moviesBL.updateMovie(movieId, updateMovie)
	return resp.json(status)
})

//delete
router.route("/:id").delete(async (req, resp) => {
	let movieId = req.params.id
	let status = await moviesBL.deleteMovie(movieId)
	return resp.json(status)
})

module.exports = router;
