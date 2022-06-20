import React, { useEffect, useState } from "react"
import axios from "axios"
import MainComp from "../login/MainComp"

/*
This is the edit movies comp. If the user clicks the "Edit" button, we need to present a title, some textboxes,
and 2 buttons ("Update" and "Cancel").
*/

function EditMovieComp(props) {

	// getting the user's name from params
	let firstName = props.match.params.firstName
	// getting the movie's id from params
	let movieId = props.match.params.movieId

	let [movie, setMovie] = useState({})
	let [movieName, setMovieName] = useState("")
	let [movieGenres, setMovieGenres] = useState([])
	let [movieImageUrl, setMovieImageUrl] = useState("")
	let [moviePremiered, setMoviePremiered] = useState("")

	// accessing the disered movie.
	// useEffect is a hook that lets you tell react that your component needs
	// to do something after render.
	// by using it we can auto-fill the textboxes with the data.

	useEffect(async () => {
		let movie = await axios.get(`http://localhost:8001/cinema/subscriptions/movies/${movieId}`)
		movie = movie.data
		setMovie(movie)
		setMovieName(movie.name)
		setMovieGenres(movie.genres)
		setMovieImageUrl(movie.image)
		setMoviePremiered(movie.premiered)
	}, [])

	async function updateMovie() {
		let updateMovie = {
			name: movieName,
			genres: movieGenres,
			image: movieImageUrl,
			premiered: moviePremiered,
		}

		await axios.put(`http://localhost:8001/cinema/subscriptions/movies/${movieId}`, updateMovie)

		// redirecting after the update
		props.history.push(`/MoviesComp/${firstName}`);
	}

	return (
		<div>
			<MainComp firstName={firstName} />
			<div className="boxAdd">
				<h3>Hi {firstName}!</h3>
				<h3> You chose to update the movie "{movie.name}" </h3><br />

				Name:{" "}
				<input type="text" value={movieName} onChange={(e) => { setMovieName(e.target.value) }} />{" "} <br />

				Genres:{" "}
				<input type="text" value={movieGenres} onChange={(e) => { setMovieGenres(e.target.value) }} />{" "} <br />

				Image Url:{" "}
				<input type="text" value={movieImageUrl} onChange={(e) => { setMovieImageUrl(e.target.value) }} />{" "} <br />

				Premiered:{" "}
				<input type="date" value={moviePremiered.slice(0, 10)} onChange={(e) => { setMoviePremiered(e.target.value) }} />{" "} <br /><br />

				<button style={{ backgroundColor: "lightgreen", color: "black", fontWeight: "100" }} onClick={updateMovie}>Update</button>{" "}

				<button style={{ backgroundColor: "gainsboro", color: "black", fontWeight: "100" }} onClick={() => { props.history.push(`/MoviesComp/${firstName}`) }}>Cancel</button>{" "}

			</div>
		</div>
	);
}
export default EditMovieComp;
