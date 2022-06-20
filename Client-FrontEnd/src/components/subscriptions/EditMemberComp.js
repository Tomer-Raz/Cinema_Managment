import React, { useEffect, useState } from "react"
import axios from "axios"
import MainComp from "../login/MainComp"

/*
This is the "edit member" comp. we need a title, some textboxes, and 2 buttons ("update" and "cancel")
*/

function EditMemberComp(props) {

	//getting the user's name from params
	const firstName = props.match.params.firstName;

	//getting the member's id from params
	let memberId = props.match.params.memberId;

	let [name, setName] = useState("");
	let [email, setEmail] = useState("");
	let [city, setCity] = useState("");

	useEffect(async () => {

		//getting the specific member data from subscriptionsDB --> members collection
		let memberObj = await axios.get(`http://localhost:8001/cinema/subscriptions/members/${memberId}`)
		memberObj = memberObj.data;

		//auto-filling the textboxes with the current data
		setName(memberObj.name);
		setEmail(memberObj.email);
		setCity(memberObj.city);
	}, []);


	async function updateMember() {
		let updateMember = { name: name, email: email, city: city };
		if (name.length < 2 || email.length < 2 || !email.includes("@") || city.length < 2) {
			alert("Make sure you filled everything correcty")
		} else {

			//updating member
			await axios.put(`http://localhost:8001/cinema/subscriptions/members/${memberId}`, updateMember);

			//redirecting
			props.history.push(`/SubscriptionsComp/${firstName}`);
		}
	}

	return (
		<div>
			<MainComp firstName={firstName} />
			<div className="overlay">

				<h3>Hi {firstName}!</h3>
				<h3> You chose to edit the data of the member "{name}"</h3><br />

				Name:{" "}
				<input type="text" value={name} onChange={(e) => { setName(e.target.value) }} /> <br />

				Email:{" "}
				<input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} /> <br />

				City:{" "}
				<input type="text" value={city} onChange={(e) => { setCity(e.target.value) }} /> <br /> <br />

				<button style={{ backgroundColor: "lightgreen", color: "black", fontWeight: "100" }} onClick={updateMember}>Update</button>{" "}
				<button style={{ backgroundColor: "gainsboro", color: "black", fontWeight: "100" }} onClick={() => { props.history.push(`/SubscriptionsComp/${firstName}`) }}>Cancel</button>{" "}
			</div>
		</div>
	)
}

export default EditMemberComp;
