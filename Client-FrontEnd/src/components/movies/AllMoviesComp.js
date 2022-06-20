import React, { useEffect, useState } from "react"
import axios from "axios"
import MovieComp from "./MovieComp"

/*
This is the component that shows the searched movies
(after clicking find in the father comp)
*/


function AllMoviesComp(props) {

	// getting the name from props
	let firstName = props.firstName;

	// using useState
	let [movieToRender, setMovieToRender] = useState("");
	let [isDelete, setIsDelete] = useState(false);

	// using useEffect to get the movies data
	useEffect(async () => {
		let movies = await axios.get("http://localhost:8001/cinema/subscriptions/movies")
		movies = movies.data;

		/*
		presenting all the movies that include the string that the user searched for in the movie name
		by using map, and also converting all the strings to lowercase to prevent further issues.
		*/

		setMovieToRender(
			movies.map((movie) => {
				if (movie.name.toLowerCase().includes(props.findMovie)) {
					return (
						<MovieComp key={movie._id} movieObj={movie} firstName={firstName} isDelete={() => { setIsDelete(!isDelete) }} />
					)
				}
			})
		)
	}, [isDelete]);

	return <div>{movieToRender}</div>

}

export default AllMoviesComp;
