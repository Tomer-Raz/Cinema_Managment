import React, { useState } from "react"
import AllUsersComp from "./AllUsersComp"
import MainComp from "../login/MainComp"

// This is the "father" comp of the users. 

function ManageUsersComp(props) {

	//getting the user's name from params
	let firstName = props.match.params.firstName;

	//setting the state of the button to "true" as default
	let [isAllUsers, setIsAllUsers] = useState(true);

	let usersToRender;
	if (isAllUsers === true) {
		usersToRender = <AllUsersComp firstName={firstName} />
	}

	return (
		<div>
			<MainComp firstName={firstName} />
			<h3 className="shadow">Hi {firstName}, Welcome To Manage Users Comp</h3><br />
			<button onClick={() => { setIsAllUsers(!isAllUsers) }}>All Users</button>{" "}
			<button onClick={() => { props.history.push(`/AddUserComp/${firstName}`) }}>Add Users</button><br /><br />
			{usersToRender}
		</div>
	);
}
export default ManageUsersComp;
