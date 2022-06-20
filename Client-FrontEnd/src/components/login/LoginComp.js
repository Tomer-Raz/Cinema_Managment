import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { IdContext } from "../UserIdContext";
import { PermissionsContext } from "../UserPermissionsContext";

/*
This is the first component we will encounter in the entire project.
It has to include a title, 2 textboxes, a "login" button, and an option to create an account.
*/


function LoginComp(props) {
	let [userName, setUserName] = useState("")
	let [password, setPassword] = useState("")

	let [UserLoginId, setUserLoginId] = useContext(IdContext)
	let [UserPermissions, setUserPermissions] = useContext(PermissionsContext)

	// getting the users data from the database

	async function loginClicked() {
		let usersDB = await axios.get("http://localhost:8001/cinema/usersDB");
		usersDB = usersDB.data;

		for (let i = 0; i < usersDB.length; i++) {
			if (usersDB[i].userName === userName && usersDB[i].password === password && usersDB[i].password !== "") {
				let userId = usersDB[i]._id

				// accessing UserIdContext.js via useContext
				setUserLoginId(userId);

				/* above is just checking the user's username and password (whilst making sure its not empty)
				and setting a variable to the user's _id from the DB
				*/

				// now we access the users.json file
				let userJson = await axios.get(
					`http://localhost:8001/cinema/usersJson/${userId}`
				)

				// setting the userJson and firstName variables
				userJson = userJson.data;
				let firstName = userJson.firstName;

				// now we access the permissions.json file
				let userPermissionsResp = await axios.get(
					`http://localhost:8001/cinema/permissionsJson/${userId}`
				)

				// accessing UserPermissionsContext.js via useContext
				setUserPermissions(userPermissionsResp.data);

				// setting a sessionTimeOut
				let sessionTimeOut = userJson.sessionTimeOut;

				// number * ms * minutes (for example, 5 minutes is 300,000 ms)
				sessionTimeOut = parseInt(sessionTimeOut) * 1000 * 60;

				if (sessionTimeOut) {
					setTimeout(() => props.history.push("/"), sessionTimeOut);
				}

				// redirect to here after a successfull login
				props.history.push(`/HomeComp/${firstName}`);
				return;
			}
		}
		alert("The username or password you entered is wrong.");
	}

	// presenting the page

	return (
		<div className="boxLogin">
			<h3 style={{ padding: "15px" }}>Log In Page</h3>
			User Name: {" "}
			<input style={{ fontSize: "80%", borderRadius: "10px", borderColor: "white", width: "30%" }} type="text" value={userName} onChange={(e) => { setUserName(e.target.value) }} /><br />

			Password:{" "}
			<input style={{ fontSize: "80%", borderRadius: "10px", borderColor: "white", width: "30%" }} type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} /><br /><br />

			<button style={{ fontSize: "80%" }} onClick={loginClicked}>Log in</button><br /><br />

			New User?<br />
			<Link to="/CreateAccountComp"><button>Create Account</button></Link><br /><br />
		</div>

	)
}
export default LoginComp;
