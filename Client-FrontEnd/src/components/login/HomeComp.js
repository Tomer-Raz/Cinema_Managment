import { Link } from "react-router-dom"
import React, { useContext } from "react"
import { IdContext } from "../UserIdContext"
import { useState } from "react";

/*
This is the main page after the login. first of all we have to create a welcome message. 
after that, we will check if the user is the admin by validating the specific id to check if it matches
the one in users collection, if it does, a "Users Management" button will appear.
*/

function HomeComp(props) {

	let firstName;

	// this will pass the name for all children components later on

	if (props.firstName !== undefined) {
		firstName = props.firstName;

		// this will display the name on the main component, getting the name from params

	} else {
		firstName = props.match.params.firstName;
	}

	// setting the button and later on defining it

	let usersManagementButton;

	// using the UserIdContext.js file (createContext and useContext)
	// checking if the user is an admin

	let [UserLoginId, setUserLoginId] = useContext(IdContext);
	if (UserLoginId === "61ac982f50861897a3f6183e") {
		usersManagementButton = <Link to={`/ManageUsersComp/${firstName}`}><a>Users Management</a></Link>
	}

	return (
		<div style={{ textShadow: "2px 2px 4px #000000" }}>
			<div class="topnav">


				<Link to={`/MoviesComp/${firstName}`}><a>Movies</a></Link>{"  "}

				<Link to={`/SubscriptionsComp/${firstName}`}><a>Subscriptions</a></Link>{"  "}

				{usersManagementButton}{"  "}

				<Link to={"/"}><a>Log Out</a></Link> <br /><br />
			</div><br />

			<h2 style={{ fontSize: "55px" }}>Good to have you back, {firstName}.</h2>
			<h2 style={{ fontSize: "40px" }}>Click on one of the buttons to continue</h2>
		</div>
	);
}
export default HomeComp;
