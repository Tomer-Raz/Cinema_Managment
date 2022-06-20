import React, { useState, useEffect } from "react"
import axios from "axios"
import MainComp from "../login/MainComp"

// This is the "edit user" comp. we need a title, some textboxes, the permissions, and 2 buttons ("update" and "cancel")


function EditUserComp(props) {

	//getting the user's name from params
	const firstName = props.match.params.firstName;

	//getting the user id from params
	const id = props.match.params.id;

	let [userDB, setUserDB] = useState({});
	let [userJson, setUserJson] = useState({});
	let [userPermissionJson, setUserPermissionJson] = useState({});

	let [firstName2, setFirstName2] = useState("");
	let [lastName, setLastName] = useState("");
	let [createdDate, setCreatedDate] = useState("");
	let [userName, setUserName] = useState("");
	let [sessionTimeOut, setSessionTimeOut] = useState("");
	let [permissions, setPermissions] = useState([]);

	useEffect(async () => {

		//getting the specific user data from userssDB --> users collection
		let userDBResp = await axios.get(`http://localhost:8001/cinema/usersDB/${id}`)
		let userDB = userDBResp.data

		//getting the specific user data from users.json
		let userJsonResp = await axios.get(`http://localhost:8001/cinema/usersJson/${id}`)
		let userJson = userJsonResp.data


		//getting the specific user data from permissions.json
		let userPermissionJsonResp = await axios.get(`http://localhost:8001/cinema/permissionsJson/${id}`)
		let userPerm = userPermissionJsonResp.data

		//filling all the states with relevant data so it will automatically show up
		setUserDB(userDB);
		setUserJson(userJson);
		setUserPermissionJson(userPerm);
		setPermissions(userPerm.permissions); // 
		setFirstName2(userJson.firstName); // First Name
		setLastName(userJson.lastName); // Last Name
		setCreatedDate(userJson.createdDate); // Created Date
		setUserName(userDB.userName); // User Name
		setSessionTimeOut(userJson.sessionTimeOut); // Session Time Out
	}, []);



	function checkboxFunc(e) {
		if (e.target.checked === true) {
			let updatePermissions = [...permissions];
			updatePermissions.push(e.target.value);

			// if "view subs" is not checked, a click on "create subs" or "delete subs"
			//or "update subs" will automatically check "view subs" as well
			if ((e.target.value === "Create Subscriptions" || e.target.value === "Update Subscriptions" || e.target.value === "Delete Subscriptions") && updatePermissions.includes("View Subscriptions") === false) {
				updatePermissions.push("View Subscriptions");
			}

			// if "view movies" is not checked, a click on "create movies" or "delete movies"
			//or "update movies" will automatically check "view movies" as well
			if ((e.target.value === "Create Movies" || e.target.value === "Update Movies" || e.target.value === "Delete Movies") && updatePermissions.includes("View Movies") === false) {
				updatePermissions.push("View Movies");
			}
			setPermissions(updatePermissions);


		} else {

			//if an option is unchecked, use the same array (spread operator),
			//find the index of the permission that has been unchecked, and
			//remove from the array using splice
			let updatePermissions2 = [...permissions];
			let index = updatePermissions2.findIndex((permission) => permission === e.target.value);
			updatePermissions2.splice(index, 1);

			//if "view subs" is unchecked, uncheck all of the other subs actions along with it
			if (e.target.value === "View Subscriptions") {
				if (updatePermissions2.includes("Create Subscriptions")) {
					let createSubsIndex = updatePermissions2.findIndex((permission) => permission === "Create Subscriptions");
					updatePermissions2.splice(createSubsIndex, 1);
				}
				if (updatePermissions2.includes("Update Subscriptions")) {
					let updateSubsIndex = updatePermissions2.findIndex((permission) => permission === "Update Subscriptions");
					updatePermissions2.splice(updateSubsIndex, 1);
				}
				if (updatePermissions2.includes("Delete Subscriptions")) {
					let deleteSubsIndex = updatePermissions2.findIndex((permission) => permission === "Delete Subscriptions");
					updatePermissions2.splice(deleteSubsIndex, 1);
				}
			}

			//if "view movies" is unchecked, uncheck all of the other movies actions along with it
			if (e.target.value === "View Movies") {
				if (updatePermissions2.includes("Create Movies")) {
					let createMoviesIndex = updatePermissions2.findIndex((permission) => permission === "Create Movies");
					updatePermissions2.splice(createMoviesIndex, 1);
				}
				if (updatePermissions2.includes("Update Movies")) {
					let updateMoviesIndex = updatePermissions2.findIndex((permission) => permission === "Update Movies");
					updatePermissions2.splice(updateMoviesIndex, 1);
				}
				if (updatePermissions2.includes("Delete Movies")) {
					let deleteMoviesIndex = updatePermissions2.findIndex((permission) => permission === "Delete Movies");
					updatePermissions2.splice(deleteMoviesIndex, 1);
				}
			}

			setPermissions(updatePermissions2);
		}
	}


	async function updateFunc() {

		//updating user in DB
		let updateUserDB = { ...userDB, userName: userName };

		//simple validation
		if (userName.length < 2 || firstName2.length < 2 || lastName.length < 2 || sessionTimeOut === "" || createdDate === "") {
			alert("Make sure you filled everything correcty")
			return;
		} else {

			//updating
			await axios.put(`http://localhost:8001/cinema/usersDB/${id}`, updateUserDB);

			//updated user json
			let updateUserJson = {
				...userJson,
				firstName: firstName2,
				lastName: lastName,
				createdDate: createdDate,
				sessionTimeOut: sessionTimeOut,
			}

			//update the user in users.json file
			await axios.put(`http://localhost:8001/cinema/usersJson/${id}`, updateUserJson)

			//updated permission json
			let updateUserPermissionJson = {
				...userPermissionJson,
				permissions: permissions,
			}

			//update the user in permissions.json file
			await axios.put(`http://localhost:8001/cinema/permissionsJson/${id}`, updateUserPermissionJson)

			//redirect
			props.history.push(`/ManageUsersComp/${firstName}`);
		}
	}
	//----------------------------------------------------------------------------------
	return (
		<div>
			<MainComp firstName={firstName} />
			<div className="overlay">
				<h3 className="shadow">Hi {firstName}, Welcome To Edit User Comp</h3><br />
				First Name:{" "}<input type="text" value={firstName2} onChange={(e) => { setFirstName2(e.target.value) }} /> <br />
				Last Name:{" "} <input type="text" value={lastName} onChange={(e) => { setLastName(e.target.value) }} /> <br />
				Created Date:{" "}<input type="text" value={createdDate} onChange={(e) => { setCreatedDate(e.target.value) }} /> <br />
				UserName:{" "}<input type="text" value={userName} onChange={(e) => { setUserName(e.target.value) }} /> <br />
				Session Time Out:{" "}<input type="text" value={sessionTimeOut} onChange={(e) => { setSessionTimeOut(e.target.value) }} /> <br /> <br />

				Permissions: <br />
				<input type="checkbox" value="View Subscriptions" checked={permissions.includes("View Subscriptions")} onChange={checkboxFunc} />
				View Subscriptions <br />
				<input type="checkbox" value="Create Subscriptions" checked={permissions.includes("Create Subscriptions")} onChange={checkboxFunc} />
				Create Subscriptions <br />
				<input type="checkbox" value="Delete Subscriptions" checked={permissions.includes("Delete Subscriptions")} onChange={checkboxFunc} />
				Delete Subscriptions <br />
				<input type="checkbox" value="Update Subscriptions" checked={permissions.includes("Update Subscriptions")} onChange={checkboxFunc} />
				Update Subscriptions <br />
				<input type="checkbox" value="View Movies" checked={permissions.includes("View Movies")} onChange={checkboxFunc} />
				View Movie <br />
				<input type="checkbox" value="Create Movies" checked={permissions.includes("Create Movies")} onChange={checkboxFunc} />
				Create Movie <br />
				<input type="checkbox" value="Delete Movies" checked={permissions.includes("Delete Movies")} onChange={checkboxFunc} />
				Delete Movie <br />
				<input type="checkbox" value="Update Movies" checked={permissions.includes("Update Movies")} onChange={checkboxFunc} />
				Update Movie <br /> <br />

				<button style={{ backgroundColor: "lightgreen", color: "black", fontWeight: "100" }} onClick={updateFunc}>Update</button>{" "}
				<button style={{ backgroundColor: "gainsboro", color: "black", fontWeight: "100" }} onClick={() => { props.history.push(`/ManageUsersComp/${firstName}`) }}>Cancel</button>{" "}
			</div>
		</div>
	);
}
export default EditUserComp;
