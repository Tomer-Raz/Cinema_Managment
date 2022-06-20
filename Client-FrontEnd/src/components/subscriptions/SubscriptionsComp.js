import React, { useContext, useEffect, useState } from "react"
import { PermissionsContext } from "../UserPermissionsContext"
import AllMembersComp from "./AllMembersComp"
import MainComp from "../login/MainComp"

// This is the "father" comp of the subscriptions. 


function SubscriptionsComp(props) {

	//getting the user's name from params
	let firstName = props.match.params.firstName

	let memberId = props.match.params.memberId;

	//using the permissions.json file by using useContext
	let [UserPermissions, setUserPermissions] = useContext(PermissionsContext)

	let [findMember, setFindMember] = useState("");
	let [isAllMembersPressed, setIsAllMembers] = useState(true)

	let membersToRender;

	useEffect(() => {
		if (memberId !== undefined) {
			setFindMember(memberId)
			membersToRender = <AllMembersComp firstName={firstName} findMember={findMember} />
		}

		// this will make the rest of the movies disappear and appear again after a render
		setTimeout(() => {
			setIsAllMembers(false);
			setTimeout(() => { setIsAllMembers(true) }, 1);
		}, 1);
	}, [memberId, false]);


	//if "All Members" is pressed (All Members=true) and the user's permissions includes "View subscriptions",
	//all of the members will be presented. if not, a message will be presented.

	if (isAllMembersPressed === true && UserPermissions.permissions.includes("View Subscriptions") === true) {
		membersToRender = <AllMembersComp firstName={firstName} findMember={findMember} />
	} else if (UserPermissions.permissions.includes("View Subscriptions") === false) {
		membersToRender = `Oops, apparently you don't have permission to view that page.`;
	}


	function addMember() {
		// if the user does not have permission, the user will get an alert message.
		// if the user has permission, the user will be redirected
		if (UserPermissions.permissions.includes("Create Subscriptions") === false) {
			alert(`Oops, apparently you don't have permission to view that page.`)
		} else {
			props.history.push(`/AddMemberComp/${firstName}`);
		}
	}

	return (
		<div>
			<MainComp firstName={firstName} />
			<h3 style={{ textShadow: "2px 2px 4px #000000" }}>Hi {firstName}, Welcome To Subscriptions Comp</h3><br />
			<button onClick={() => { setIsAllMembers(!isAllMembersPressed) }}>All Members</button>{" "}
			<button onClick={addMember}>Add Member</button>{" "}<br /><br />
			{membersToRender}
		</div>
	);
}
export default SubscriptionsComp;
