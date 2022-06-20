import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

// This is the comp that will present which member has subscribed to the movie and when
// ------------------------------------------------------------------------------------

function MovieSubscriptionsComp(props) {

	//getting the user's name from props
	const firstName = props.firstName

	//getting the movie's id from props
	let movieId = props.movieId

	let [fullData, setFullData] = useState([]);

	useEffect(async () => {

		//accessing the subscriptionsDB --> subscriptions colletion
		let subscriptions = await axios.get("http://localhost:8001/cinema/subscriptions/subscriptions")
		subscriptions = subscriptions.data

		//accessing the subscriptionsDB --> members colletion
		let members = await axios.get("http://localhost:8001/cinema/subscriptions/members")
		members = members.data

		//checking all the subscribers by using forEach (array of obj) to see what movie
		//they are subscribed to. after that, filtering the array
		//if there are no subscribers to a certain movie, no name will be presented
		let movieSubs = subscriptions.filter((sub) => {
			let isSubWatched = false;
			sub.movies.forEach((movie) => {
				if (movie.movieId === movieId) {
					isSubWatched = true;
				}
			})
			if (isSubWatched) {
				return sub;
			}
		})


		//setting the date. from the movie's subs, get the date that the member subscribed at,
		//if there is no date (null), use today's date
		let shapedFullData = movieSubs.map((sub) => {
			let date;
			sub.movies.forEach((movie) => {
				if (movie.date !== null) {
					date = movie.date.slice(0, 10);
				} else {
					let today = new Date().toJSON().slice(0, 10)
					date = today;
				}
			})

			//we have the id and the date, now we need the name.
			//finding the index of each sub in the members array
			//remember, we are still in map
			let i = members.findIndex((member) => member._id === sub.memberId)

			//now we can access the member obj (we know its index in the array)
			let member = members[i]

			//returning the relevant data
			return { memberId: member._id, date: date, name: member.name };

		})

		setFullData(shapedFullData);

	}, [])

	//presenting the subs in li by using map
	let dataToRender = fullData.map((data) => {
		return (
			<li key={data.memberId}>
				<Link to={`/SubscriptionsComp/${firstName}/${data.memberId}`}>{data.name}</Link>
				, {data.date}
			</li>
		)
	})

	//-------------------------------------------------------------

	return (
		<div style={{ width: "260px", display: "inline-block", fontSize: "13px", margin: "15px" }}>
			<h4> Subscriptions </h4>
			<ul>{dataToRender}</ul>
		</div>
	)

}
export default MovieSubscriptionsComp;
