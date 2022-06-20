const express = require("express")
const membersBL = require("../BLs/membersBL")
const router = express.Router()

//Controller for the members

//get all
router.route("/").get(async (req, resp) => {
	let data = await membersBL.getAllMembers()
	return resp.json(data)
})

//get by id
router.route("/:id").get(async (req, resp) => {
	let memberId = req.params.id
	let data = await membersBL.getMemberById(memberId)
	return resp.json(data)
})

//add
router.route("/").post(async (req, resp) => {
	let newMember = req.body
	let data = await membersBL.addMember(newMember)
	return resp.json(data)
})

//update
router.route("/:id").put(async (req, resp) => {
	let memberId = req.params.id
	let updateMember = req.body
	let status = await membersBL.updateMember(memberId, updateMember)
	return resp.json(status)
})

//delete
router.route("/:id").delete(async (req, resp) => {
	let memberId = req.params.id
	let status = await membersBL.deleteMember(memberId)
	return resp.json(status)
})

module.exports = router;
