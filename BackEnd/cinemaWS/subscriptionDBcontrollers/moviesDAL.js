const axios = require("axios")
const express = require("express")
const router = express.Router()

//Controller for the subscriptionsDB (movies collection)

//get all
router.route("/").get(async (req, resp) => {
	let response = await axios.get(`http://localhost:8000/subscriptions/movies`)
	return resp.json(response.data)
})

//get by id
router.route("/:id").get(async (req, resp) => {
	let movieId = req.params.id
	let response = await axios.get(`http://localhost:8000/subscriptions/movies/${movieId}`)
	return resp.json(response.data)
})

//add
router.route("/").post(async (req, resp) => {
	let newMovie = req.body
	let response = await axios.post(`http://localhost:8000/subscriptions/movies`, newMovie)
	return resp.json(response.data)
})

//update
router.route("/:id").put(async (req, resp) => {
	let movieId = req.params.id
	let updateMovie = req.body
	let response = await axios.put(`http://localhost:8000/subscriptions/movies/${movieId}`, updateMovie)
	return resp.json(response.data)
})

//delete
router.route("/:id").delete(async (req, resp) => {
	let movieId = req.params.id
	let response = await axios.delete(`http://localhost:8000/subscriptions/movies/${movieId}`)
	return resp.json(response.data)
})

module.exports = router;
