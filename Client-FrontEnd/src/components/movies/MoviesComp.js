import React, { useContext, useEffect, useState } from "react"
import { PermissionsContext } from "../UserPermissionsContext"
import AllMoviesComp from "./AllMoviesComp"
import MainComp from "../login/MainComp"

// This is the "father" comp of the movies. 


function MoviesComp(props) {

	//getting the user's name from params
	let firstName = props.match.params.firstName

	//using the permissions.json file by using useContext
	let [UserPermissions, setUserPermissions] = useContext(PermissionsContext);

	let [isAllMovies, setIsAllMovies] = useState(true);
	let [isDelete, setIsDelete] = useState(false);
	let [findMovie, setFindMovie] = useState("");
	let [isFind, setIsFind] = useState(false);

	let movieWatchedName = props.match.params.movieWatchedName;

	useEffect(() => {
		if (movieWatchedName !== undefined) {
			setFindMovie(movieWatchedName)
			moviesToRender = (
				<AllMoviesComp firstName={firstName} findMovie={findMovie} isDelete={(data) => { setIsDelete(data) }} />
			);
		}

		// this will make the rest of the movies disappear and appear again after a render
		setTimeout(() => {
			setIsAllMovies(false);
			setTimeout(() => { setIsAllMovies(true) }, 1);
		}, 1);
	}, [movieWatchedName, isFind]);


	let moviesToRender;

	/*
	if "Movies" is pressed (All Movies=true) and the user's permissions includes "View Movies",
	all of the movies will be presented. if not, a message will be presented.
	*/
	if (isAllMovies === true && UserPermissions.permissions.includes("View Movies") === true) {
		moviesToRender = <AllMoviesComp firstName={firstName} findMovie={findMovie} />

	} else if (UserPermissions.permissions.includes("View Movies") === false) {
		moviesToRender = `Oops, apparently you don't have permission to view that page.`;
	}

	function addMovieFunc() {
		// if the user does not have permission, the user will get an alert message.
		// if the user has permission, the user will be redirected
		if (UserPermissions.permissions.includes("Create Movies") === false) {
			alert(`Oops, apparently you don't have permission to view that page.`);
		} else {
			props.history.push(`/AddMovieComp/${firstName}`);
		}
	}

	return (
		<div>
			<MainComp firstName={firstName} />


			<h3 className="shadow">Hi {firstName}, Welcome To Movies Comp</h3><br />

			<button onClick={() => { setIsAllMovies(!isAllMovies) }}>All Movies</button>{" "}
			<button onClick={addMovieFunc}>Add Movie</button>{" "}<br /><br />
			<b className="shadow">Find Movie:</b>{" "}
			<input type="text" onChange={(e) => { setFindMovie(e.target.value.toLowerCase()) }} />{" "}
			<button onClick={() => { setIsFind(!isFind) }}>Find</button>{" "}<br /><br />
			{moviesToRender}
		</div>
	);
}
export default MoviesComp;
