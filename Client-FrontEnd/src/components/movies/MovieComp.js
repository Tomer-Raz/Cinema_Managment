import React, { useState, useContext } from "react"
import { PermissionsContext } from "../UserPermissionsContext"
import MovieSubscriptionsComp from "./MovieSubscriptionsComp"
import axios from "axios"
import { Link } from "react-router-dom"

/*
This is the comp that present a specifically search movie. or movies.
*/

function MovieComp(props) {

	//getting the movie as an object from AllMoviesComp.js
	let [movie, setMovie] = useState(props.movieObj);

	//using permissions.json
	let [UserPermissions, setUserPermissions] = useContext(PermissionsContext);

	//getting the user's name from props
	let firstName = props.firstName;

	let editButtonToRender;
	let deleteButtonToRender;

	//checking if the user has permissions to update movies
	//if there are permission, redirecting to EditMovieComp
	if (UserPermissions.permissions.includes("Update Movies")) {
		editButtonToRender = (
			<Link to={`/EditMovieComp/${firstName}/${movie._id}`}>
				<button>Edit</button>
			</Link>
		)
	}

	//checking if the user has permissions to delete movies
	//if there are permission, executing delete function
	if (UserPermissions.permissions.includes("Delete Movies")) {
		deleteButtonToRender = (
			<button onClick={deleteMovieFunc}>Delete</button>
		)
	}

	async function deleteMovieFunc() {
		await axios.delete(`http://localhost:8001/cinema/subscriptions/movies/${movie._id}`)

		//accessing AllMoviesComp -> MoviesComp
		//so the movie will get deleted instantly (with no render)
		props.isDelete(true)
	}

	return (
		<div className="box">

			{/* using slice to present only the year */}
			<h3>{movie.name}, {movie.premiered.slice(0, 4)}</h3>

			{/* using join to present only genres separately */}
			<b>Genres:</b> {movie.genres.join(", ")} <br /> <br />

			<img src={movie.image} width="130px" style={{ borderRadius: "5%" }} /><br />
			{editButtonToRender} {deleteButtonToRender}<br /><br />
			<MovieSubscriptionsComp movieId={movie._id} firstName={firstName} />

		</div>
	)
}
export default MovieComp;
