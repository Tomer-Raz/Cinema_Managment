import React, { useState } from "react"
import axios from "axios"
import MainComp from "../login/MainComp"

/*
This is the add movie comp. we need to present a title, some textboxes, and 2 buttons ("save" and "cancel")
*/

function AddMovieComp(props) {

	// getting the name from params
	let firstName = props.match.params.firstName

	// using useState 
	let [name, setName] = useState("")
	let [genres, setGenres] = useState([])
	let [imageUrl, setImageUrl] = useState("")
	let [premiered, setPremiered] = useState("")

	async function addMovie() {
		if (name.length < 2 || genres === "" || imageUrl.length < 2 || premiered === "") {
			alert("Make sure you filled everything correcty")
		} else {

			// defining the movie object
			let newMovie = {
				name: name,
				genres: genres,
				image: imageUrl,
				premiered: premiered,
			}

			await axios.post("http://localhost:8001/cinema/subscriptions/movies", newMovie)
			props.history.push(`/MoviesComp/${firstName}`)
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


	return (
		<div>
			<MainComp firstName={firstName} />
			<div className="boxAdd">
				<h3>Hi {firstName}!</h3>
				<h3> Here you can add a new movie </h3><br />

				Name:{" "}
				<input type="text" onChange={(e) => { setName(e.target.value) }} /> <br />
				Genres:{" "}
				<input type="text" onChange={(e) => { setGenres(e.target.value.split(",")) }} /><br />
				Image Url:{" "}
				<input type="text" onChange={(e) => { setImageUrl(e.target.value) }} /><br />
				Premiered:{" "}
				<input type="date" max={today} onChange={(e) => { setPremiered(e.target.value) }} /><br /><br />

				<button style={{ backgroundColor: "lightgreen", color: "black", fontWeight: "100" }} onClick={addMovie}>Save</button>{" "}

				<button style={{ backgroundColor: "gainsboro", color: "black", fontWeight: "100" }} onClick={() => { props.history.push(`/MoviesComp/${firstName}`) }}>Cancel</button>{" "}

			</div>
		</div>
	)
}
export default AddMovieComp;
