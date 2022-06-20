import axios from "axios"
import React, { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { PermissionsContext } from "../UserPermissionsContext"
import SubscribeOnNewMovieComp from "./SubscribeOnNewMovieComp"

// This is the comp that will present which movie has the member subscribed to and when
// ------------------------------------------------------------------------------------

function MemberSubscriptionsComp(props) {

	let [UserPermissions, setUserPermissions] = useContext(PermissionsContext)
	let [memberSubs, setMemberSubs] = useState([])
	let [isButtonPressed, setButtonPress] = useState(false)
	let [moviesWatched, setMoviesWatched] = useState([])

	//getting the user's name from props
	const firstName = props.firstName

	//getting the member's id from props
	let memberId = props.memberId


	useEffect(async () => {

		//accessing the subscriptionsDB --> subscriptions colletion
		let subscriptions = await axios.get("http://localhost:8001/cinema/subscriptions/subscriptions")
		subscriptions = subscriptions.data;

		//finding the subscribers' memberId
		let subsOfMember = subscriptions.find((sub) => sub.memberId === memberId);
		subsOfMember && setMemberSubs(subsOfMember.movies);
	}, []);


	//checking each subscriber, what movies did they watch
	useEffect(async () => {
		let moviesWatchedProms = memberSubs.map(async (sub) => {

			//accessing movie data and exporting the relevant 
			let movie = await axios.get(`http://localhost:8001/cinema/subscriptions/movies/${sub.movieId}`)
			movie = movie.data;

			let movieWatched = {
				id: movie._id,
				name: movie.name,
				date: sub.date,
			}
			return movieWatched;
		})

		//by using spread operator, adding the watched movie to the array
		//whilst keeping all of the other movies inside too
		let moviesWatched = await Promise.all([...moviesWatchedProms]);
		setMoviesWatched(moviesWatched);

	}, [memberSubs]);


	let dataToRender;
	dataToRender = moviesWatched.map((movieWatched) => {

		//checking if the user has permission to view movies.
		if (UserPermissions.permissions.includes("View Movies")) {

			//setting the date. if there is no date somehow (null), use today's date
			let movieWatchedDate;
			if (movieWatched.date !== null) {
				movieWatchedDate = movieWatched.date.slice(0, 10);
			} else {
				let today = new Date().toJSON().slice(0, 10)
				movieWatchedDate = today;
			}
			return (
				<li key={movieWatched.movieId}>
					<Link to={`/MoviesComp/${firstName}/${movieWatched.name.toLowerCase()}`}>
						{movieWatched.name}
					</Link> , {movieWatchedDate}</li>
			)
		}
	})

	//if the button is pressed, a new comp will appear
	//another press on the button will close the comp
	//passing data to child comp
	let newSubscription;
	if (isButtonPressed == true) {
		newSubscription = (
			<SubscribeOnNewMovieComp
				memberId={memberId}
				moviesWatched={moviesWatched}
				firstName={firstName}
				isShow={(data) => { setButtonPress(data) }} />
		)
	}

	//if the user has permissions, he will see the create sub button
	//if not, he will not see anything

	let newButton;
	if (UserPermissions.permissions.includes("Update Subscriptions")) {
		newButton = <button style={{ backgroundColor: "lightblue", color: "black", fontWeight: "100" }} onClick={() => { setButtonPress(!isButtonPressed) }}>Subscribe to new movie</button>
	}

	//--------------------------------------------------------------

	return (
		<div style={{ width: "260px", display: "inline-block", fontSize: "13px", margin: "15px" }}>

			<b>Movies Watched</b> <br />
			{dataToRender}<br />
			{newButton}
			{newSubscription} <br />

		</div>
	)
}
export default MemberSubscriptionsComp;
