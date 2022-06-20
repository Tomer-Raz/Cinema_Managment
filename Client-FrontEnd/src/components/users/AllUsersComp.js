import React, { useEffect, useState } from "react"
import axios from "axios"
import UserComp from "./UserComp"

/*
This is a comp that will help us transfer data to another component.
using "User Comp", we will present everything
*/

function AllUsersComp(props) {

	//getting the user name from props
	let firstName = props.firstName

	let [userToRender, setUserToRender] = useState("");

	useEffect(async () => {

		//getting all the users from the usersDB --> users collection
		let usersDB = await axios.get("http://localhost:8001/cinema/usersDB");
		usersDB = usersDB.data;

		setUserToRender(
			usersDB.map((user) => {

				// admin is not a user, so the relevant comp is not presented
				if (user._id !== "61ac982f50861897a3f6183e") {
					return <UserComp firstName={firstName} key={user._id} userId={user._id} />
				}
			})
		)
	}, []);

	return <div>{userToRender}</div>;
}
export default AllUsersComp;
