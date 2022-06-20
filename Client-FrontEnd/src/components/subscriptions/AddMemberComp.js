import React, { useState } from "react"
import axios from "axios"
import MainComp from "../login/MainComp"

/*
This is the "add member" comp. we need a title, some textboxes, and 2 buttons ("save" and "cancel")
*/

function AddMemberComp(props) {

	//getting the name from params
	const firstName = props.match.params.firstName;

	let [name, setName] = useState("");
	let [email, setEmail] = useState("");
	let [city, setCity] = useState("");

	async function saveMember() {
		let newMember = { name: name, email: email, city: city };
		if (name.length < 2 || email.length < 2 || !email.includes("@") || city.length < 2) {
			alert("Make sure you filled everything correcty")
		} else {

			//saving a new member
			await axios.post(`http://localhost:8001/cinema/subscriptions/members`, newMember)

			//redirecting
			props.history.push(`/SubscriptionsComp/${firstName}`)
		}
	}

	return (
		<div>
			<MainComp firstName={firstName} />
			<div className="boxAdd">

				<h3>Hi {firstName}, Welcome To Add Member Comp</h3><br />

				Name:{" "}
				<input type="text" onChange={(e) => { setName(e.target.value) }} /> <br />

				Email:{" "}
				<input type="text" onChange={(e) => { setEmail(e.target.value) }} /> <br />

				City:{" "}
				<input type="text" onChange={(e) => { setCity(e.target.value) }} /> <br /> <br />

				<button style={{ backgroundColor: "lightgreen", color: "black", fontWeight: "100" }} onClick={saveMember}>Save</button>{" "}
				<button style={{ backgroundColor: "gainsboro", color: "black", fontWeight: "100" }} onClick={() => { props.history.push(`/SubscriptionsComp/${firstName}`) }}>Cancel</button>{" "}
			</div>
		</div>
	);
}
export default AddMemberComp;
