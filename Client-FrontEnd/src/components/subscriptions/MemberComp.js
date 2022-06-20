import React, { useEffect, useState, useContext } from "react"
import { PermissionsContext } from "../UserPermissionsContext"
import axios from "axios"
import MemberSubscriptionsComp from "./MemberSubscriptionsComp"
import { Link } from "react-router-dom"

/*
This is the member comp that will present the members
*/

function MemberComp(props) {

	//getting the user name from props
	const firstName = props.firstName;

	//getting the member id from props
	let memberId = props.memberId;

	let [UserPermissions, setUserPermissions] = useContext(PermissionsContext);

	let [member, setMember] = useState({});
	let [isRendered, setRender] = useState(false)


	let editButtonToRender;
	let deleteButtonToRender;

	//checking if the user has permissions to update subscriptions
	//if there are permission, redirecting to EditMemberComp
	if (UserPermissions.permissions.includes("Update Subscriptions")) {
		editButtonToRender = (
			<Link to={`/EditMemberComp/${firstName}/${memberId}`}>
				<button>Edit</button>
			</Link>
		)
	}

	//checking if the user has permissions to delete subscriptions
	//if there are permission, executing delete function
	if (UserPermissions.permissions.includes("Delete Subscriptions")) {
		deleteButtonToRender = (
			<button onClick={deleteMemberFunc}>Delete</button>

		)
	}

	async function deleteMemberFunc() {
		await axios.delete(`http://localhost:8001/cinema/subscriptions/members/${memberId}`)

		//accessing AllMembersComp so the movie will get deleted instantly (with no render)
		props.isDelete(true);
	}

	//getting the member's data so we will be able to present it
	useEffect(async () => {
		let member = await axios.get(`http://localhost:8001/cinema/subscriptions/members/${memberId}`)
		member = member.data;
		setMember(member);
	}, []);


	return (
		<div className="box">
			<h3>{member.name}</h3>
			Email: {member.email} <br />
			City: {member.city} <br />
			{editButtonToRender} {deleteButtonToRender} <br /> <br />
			<MemberSubscriptionsComp memberId={memberId} firstName={firstName} />
		</div>
	)
}

export default MemberComp;
