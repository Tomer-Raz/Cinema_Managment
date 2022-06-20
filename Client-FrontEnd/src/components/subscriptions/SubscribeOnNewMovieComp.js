import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

// This is the comp that lets us subscribe to a new movie
// ------------------------------------------------------------------------------------

function SubscribeOnNewMovieComp(props) {

	//getting the memberId from props
	let memberId = props.memberId;

	// getting the name from props
	let firstName = props.firstName;

	//getting what movies the member watched
	let moviesWatched = props.moviesWatched;

	let [unWatchedMovies, setUnWatchedMovies] = useState([]);
	let [movieId, setMovieId] = useState("");
	let [date, setDate] = useState("");


	useEffect(async () => {

		//accessing the subscriptionsDB --> movies colletion
		let movies = await axios.get(`http://localhost:8001/cinema/subscriptions/movies`)
		movies = movies.data;


		//checking what movies the member has watched already, and removing them
		// from the list of movies
		let shapedMovies = movies;
		if (moviesWatched.length > 0) {

			// for all the movies
			movies.forEach((movie) => {

				//check each movie that has been watched
				moviesWatched.map((movieWatched) => {
					if (movie._id === movieWatched.id) {

						//find the movie index and remove from list
						let index = shapedMovies.findIndex((movie) => movie._id === movieWatched.id)
						shapedMovies.splice(index, 1)
						setUnWatchedMovies(shapedMovies)
					}
				})
			})
		} else {
			setUnWatchedMovies(movies);
		}
	}, [])


	// returning each movie that hasnt been watched by the member as an option
	// after render the movie list will update depending on the actions
	let dataToRender;
	if (unWatchedMovies) {
		dataToRender = unWatchedMovies.map((movie) => {
			return (
				<option key={movie._id} value={movie._id}>
					{movie.name}
				</option>
			)
		})
	}


	async function subscribeClicked() {
		if (date === "") {
			alert("Make sure you selected a date")
			return;
		} else {
			if (moviesWatched.length > 0) {

				//accessing the subscriptionsDB --> subscriptions colletion
				let subscriptions = await axios.get("http://localhost:8001/cinema/subscriptions/subscriptions")
				subscriptions = subscriptions.data;

				/*if the member already subscribed to 1 or more movies, the next subscription will
				simply be added to his array of watched movies (under the same id) */
				subscriptions.forEach(async (sub) => {
					if (sub.memberId === memberId) {

						sub = {
							...sub,
							movies: [...sub.movies, { movieId: movieId, date: date }],
						}

						await axios.put(`http://localhost:8001/cinema/subscriptions/subscriptions/${sub._id}`, sub)
					}
				})
				props.isShow(false);

			} else {

				/*if the member has not subscribed to any movies yet, a new obj will be
				created and be added to the subscriptions collection */
				let newSubscribe = {
					memberId: memberId,
					movies: [{ movieId: movieId, date: date }],
				}
				await axios.post("http://localhost:8001/cinema/subscriptions/subscriptions", newSubscribe)
				props.isShow(false);
			}
		}
	}

	//date validation, so the max date will be the current day
	//setting the default option when choosing date to today
	let today = new Date();
	let dd = today.getDate();
	let mm = today.getMonth() + 1; //January is 0!
	let yyyy = today.getFullYear();

	if (dd < 10) {
		dd = '0' + dd;
	}

	if (mm < 10) {
		mm = '0' + mm;
	}

	today = yyyy + '-' + mm + '-' + dd;

	//----------------------------------------------------

	return (
		<div style={{ width: "200px", display: "inline-block", fontSize: "13px", margin: "15px", boxShadow: "2px 2px 4px #000000" }}>
			<b>Add New Movie</b> <br />

			<select style={{ width: "170px" }} onChange={(e) => { setMovieId(e.target.value); }}>
				<option selected={true} disabled="disabled">Choose a movie</option>
				{dataToRender}
			</select><br />

			<input type="date" max={today} onChange={(e) => { setDate(e.target.value) }} />{" "}<br />
			<button style={{ backgroundColor: "lightgreen", color: "black", fontWeight: "100", padding: "5px", margin: "5px" }} onClick={subscribeClicked}>Subscribe</button><br />
		</div>
	);
}

export default SubscribeOnNewMovieComp;
