const Movie = require("../models/movieModel")
const SubscriptionsBL = require("./subscriptionsBL")

//BL for the movie model file

//get all
const getAllMovies = () => {
	return new Promise((resolve, reject) => {
		Movie.find({}, (err, data) => {
			if (err) {
				reject(err)
			} else {
				resolve(data)
			}
		})
	})
}

//get by id
const getMovieById = (movieId) => {
	return new Promise((resolve, reject) => {
		Movie.findById(movieId, (err, data) => {
			if (err) {
				reject(err)
			} else {
				resolve(data)
			}
		})
	})
}

//add
const addMovie = (newMovie) => {
	return new Promise((resolve, reject) => {
		let movieToSave = new Movie({
			name: newMovie.name,
			genres: newMovie.genres,
			image: newMovie.image,
			premiered: newMovie.premiered,
		});
		movieToSave.save((err) => {
			if (err) {
				reject(err)
			} else {
				resolve(movieToSave)
			}
		})
	})
}

//update
const updateMovie = (movieId, movieToUpdate) => {
	return new Promise((resolve, reject) => {
		Movie.findByIdAndUpdate(
			movieId,
			{
				name: movieToUpdate.name,
				genres: movieToUpdate.genres,
				image: movieToUpdate.image,
				premiered: movieToUpdate.premiered,
			},
			(err) => {
				if (err) {
					reject(err)
				} else {
					resolve("Update Movie")
				}
			}
		)
	})
}

//delete
const deleteMovie = async (movieId) => {
	await deleteMovieFromSubscriptions(movieId);
	return new Promise((resolve, reject) => {
		Movie.findByIdAndRemove(movieId, (err) => {
			if (err) {
				reject(err)
			} else {
				resolve("Movie Deleted")
			}
		})
	})
}

//delete from subscriptions
const deleteMovieFromSubscriptions = async (movieId) => {
	let subscriptions = await SubscriptionsBL.getAllSubscriptions()
	subscriptions.forEach(async (sub) => {
		let isWatched = false
		sub.movies.forEach((movie) => {
			if (movie.movieId == movieId) {
				isWatched = true
			}
		})
		if (isWatched) {
			let index = sub.movies.findIndex((movie) => movie.movieId == movieId)
			sub.movies.splice(index, 1)
			await SubscriptionsBL.updateSubscription(sub._id, sub)
		}
	})
}

module.exports = { getAllMovies, getMovieById, addMovie, updateMovie, deleteMovie, }
