import axios from "axios"
import React, { useState } from "react"
import MainComp from "../login/MainComp"

// This is the comp that lets the admin add a new user 


function AddUserComp(props) {

	//getting the user's name from params
	let firstName = props.match.params.firstName;

	let [firstName2, setFirstName2] = useState("");
	let [lastName, setLastName] = useState("");
	let [userName, setUserName] = useState("");
	let [sessionTimeOut, setSessionTimeOut] = useState("");
	let [permissions, setPermissions] = useState([]);

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

	async function saveFunc() {

		//saving new user to DB
		let saveUserDB = { userName: userName, password: "" }

		//simple validation
		if (userName.length < 2 || firstName2.length < 2 || lastName.length < 2 || sessionTimeOut === "") {
			alert("Make sure you filled everything correcty")
			return;
		} else {

			//saving
			await axios.post("http://localhost:8001/cinema/usersDB", saveUserDB);

			//accessing the DB again
			let usersDB = await axios.get("http://localhost:8001/cinema/usersDB");
			usersDB = usersDB.data;

			//getting the id that mongoDB created
			let newId = usersDB[usersDB.length - 1]._id;

			//creation date will be the current day
			let d = new Date();
			d = d.toLocaleDateString();

			//new user json
			let saveUserJson = {
				id: newId,
				firstName: firstName2,
				lastName: lastName,
				createdDate: d,
				sessionTimeOut: sessionTimeOut
			}

			//add the user in users.json file
			await axios.post("http://localhost:8001/cinema/usersJson", saveUserJson);

			//add the user in permissions.json file
			let savePermissionsJson = { id: newId, permissions: permissions };
			await axios.post("http://localhost:8001/cinema/permissionsJson", savePermissionsJson);

			//redirect
			props.history.push(`/ManageUsersComp/${firstName}`);
		}
	}
	return (
		<div>
			<MainComp firstName={firstName} />
			<div className="boxAdd">

				<h3>Hi {firstName}, Welcome To Add User Comp</h3><br />

				First Name:{" "}
				<input type="text" onChange={(e) => { setFirstName2(e.target.value) }} /><br />
				Last Name:{" "}
				<input type="text" onChange={(e) => { setLastName(e.target.value) }} /><br />
				UserName:{" "}
				<input type="text" onChange={(e) => { setUserName(e.target.value) }} /><br />
				Session Time Out:{" "}
				<input type="number" min="1" onChange={(e) => { setSessionTimeOut(e.target.value) }} /><br /> <br />

				Permissions: <br />
				<input type="checkbox" checked={permissions.includes("View Subscriptions")} value="View Subscriptions" onChange={checkboxFunc} />
				View Subscriptions <br />
				<input type="checkbox" checked={permissions.includes("Create Subscriptions")} value="Create Subscriptions" onChange={checkboxFunc} />
				Create Subscriptions <br />
				<input type="checkbox" checked={permissions.includes("Delete Subscriptions")} value="Delete Subscriptions" onChange={checkboxFunc} />
				Delete Subscriptions <br />
				<input type="checkbox" checked={permissions.includes("Update Subscriptions")} value="Update Subscriptions" onChange={checkboxFunc} />
				Update Subscriptions <br />
				<input type="checkbox" checked={permissions.includes("View Movies")} value="View Movies" onChange={checkboxFunc} />
				View Movie <br />
				<input type="checkbox" checked={permissions.includes("Create Movies")} value="Create Movies" onChange={checkboxFunc} />
				Create Movie <br />
				<input type="checkbox" checked={permissions.includes("Delete Movies")} value="Delete Movies" onChange={checkboxFunc} />
				Delete Movie <br />
				<input type="checkbox" checked={permissions.includes("Update Movies")} value="Update Movies" onChange={checkboxFunc} />
				Update Movie <br /> <br />
				<button style={{ backgroundColor: "lightgreen", color: "black", fontWeight: "100" }} onClick={saveFunc}>Save</button>{" "}
				<button style={{ backgroundColor: "gainsboro", color: "black", fontWeight: "100" }} onClick={() => { props.history.push(`/ManageUsersComp/${firstName}`) }}>Cancel</button>{" "}
			</div>
		</div>
	);
}
export default AddUserComp;
