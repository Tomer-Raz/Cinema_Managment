import React, { useEffect, useState } from "react"
import axios from "axios"
import MemberComp from "./MemberComp"

/*
This is a comp that will help us transfer data to another component.
using "Member Comp", we will present everything
*/

function AllMembersComp(props) {
	let [memberToRender, setMemberToRender] = useState("");
	let [isDelete, setIsDelete] = useState(false);

	useEffect(async () => {

		//getting all the members from the subscriptionsDB --> members collection
		let members = await axios.get(`http://localhost:8001/cinema/subscriptions/members/`)
		members = members.data;

		setMemberToRender(
			members.map((member) => {
				if (member._id.includes(props.findMember)) {
					return (
						<MemberComp key={member._id} memberId={member._id} firstName={props.firstName} isDelete={() => { setIsDelete(!isDelete) }} />
					)
				}
			})
		)
	}, [isDelete]);

	return (
		<div>
			<br />
			{memberToRender}
		</div>
	);
}
export default AllMembersComp;
