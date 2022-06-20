import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

// This is the user comp that will present the users


function UserComp(props) {

	//getting the user name from props
	let firstName = props.firstName

	//getting the user id from props
	let id = props.userId

	let [userDB, setUserDB] = useState({});
	let [userJson, setUserJson] = useState({});
	let [userPermissionJson, setUserPermissionJson] = useState({});


	useEffect(async () => {

		//getting the user from the usersDB --> users collection
		let userDB = await axios.get(`http://localhost:8001/cinema/usersDB/${id}`)

		//getting the user from the users.json file
		let userJson = await axios.get(`http://localhost:8001/cinema/usersJson/${id}`);

		//getting the user from the permissions.json file
		let userPermissionJson = await axios.get(`http://localhost:8001/cinema/permissionsJson/${id}`);

		//setting the states
		setUserDB(userDB.data);
		setUserJson(userJson.data);
		setUserPermissionJson(userPermissionJson.data);
	}, []);


	//delete function - from all the locations
	async function deleteFunc() {

		//deleting from usersDB
		await axios.delete(`http://localhost:8001/cinema/usersDB/${id}`);

		//deleting from users.json file
		await axios.delete(`http://localhost:8001/cinema/usersJson/${id}`);

		//deleting from permissions.json file
		await axios.delete(`http://localhost:8001/cinema/permissionsJson/${id}`);
	}

	//presenting the permissions
	let permissionsToRender;

	//if the user has permissions
	if (userPermissionJson.permissions !== undefined) {
		permissionsToRender = userPermissionJson.permissions.join(", ");
	}

	return (
		<div className="box">

			Name: {userJson.firstName} <br />
			User Name: {userDB.userName} <br />
			Session Time Out: {userJson.sessionTimeOut} <br />
			Created Date: {userJson.createdDate} <br />
			Permissions: {permissionsToRender} <br /> <br />

			<Link to={`/EditUserComp/${firstName}/${id}`}><button>Edit</button></Link>{" "}
			<button onClick={deleteFunc}>Delete</button><br /><br />
		</div >
	);
}
export default UserComp;
