import axios from "axios"
import React, { useState } from "react"

/*
This is the "Create Account" component.
It has to include a title, 2 textboxes, a "create" button and a "cancel" button.
*/

function CreateAccountComp(props) {
	let [userName, setUserName] = useState("")
	let [password, setPassword] = useState("")

	async function createClicked() {

		// getting all of the users data from the database
		let usersDB = await axios.get("http://localhost:8001/cinema/usersDB");
		usersDB = usersDB.data;

		/*
		checking the the user exists in the database.
		if it does exist, the user can create an account and set a password.
		(updating will only affect the password of the user, the id and username
		remain the same, by using spread operator)
		if it doesnt, an error message will appear.
		*/

		for (let i = 0; i < usersDB.length; i++) {
			if (usersDB[i].userName === userName) {
				if (password.length < 2) {
					alert("Password is too short")
					return;
				} else {
					let updateUser = { ...usersDB[i], password: password }
					axios.put(`http://localhost:8001/cinema/usersDB/${usersDB[i]._id}`, updateUser)
					props.history.push("/");
					return;
				}
			}
		}
		alert("The username does not exist in the data base")
	}

	return (
		<div className="boxLogin">
			<h3 style={{ padding: "15px" }}>Create An Acount</h3>

			User Name:{" "}
			<input style={{ fontSize: "80%", borderRadius: "10px", borderColor: "white", width: "30%" }} type="text" onChange={(e) => { setUserName(e.target.value) }} /> <br />

			Password:{" "}
			<input style={{ fontSize: "80%", borderRadius: "10px", borderColor: "white", width: "30%" }} type="text" onChange={(e) => { setPassword(e.target.value) }} /><br /><br />

			<button style={{ backgroundColor: "lightgreen", color: "black", fontWeight: "100" }} onClick={createClicked}>Create</button>{" "}
			<button style={{ backgroundColor: "gainsboro", color: "black", fontWeight: "100" }} onClick={() => { props.history.push("/") }}>Cancel</button>
		</div>
	);
}
export default CreateAccountComp;
