const express = require("express")
const usersDB_BL = require("../BLs/usersDB_BL")
const router = express.Router()

//Controller for the usersDB

//get all
router.route("/").get(async (req, resp) => {
	let data = await usersDB_BL.getAllUsersDB()
	return resp.json(data)
})

//get by id
router.route("/:id").get(async (req, resp) => {
	let userId = req.params.id
	let data = await usersDB_BL.getUserByIdDB(userId)
	return resp.json(data)
})

//add
router.route("/").post(async (req, resp) => {
	let newUser = req.body
	let data = await usersDB_BL.addUserDB(newUser)
	return resp.json(data)
})

//update
router.route("/:id").put(async (req, resp) => {
	let userId = req.params.id
	let updateUser = req.body
	let status = await usersDB_BL.updateUserDB(userId, updateUser)
	return resp.json(status)
})

//delete
router.route("/:id").delete(async (req, resp) => {
	let userId = req.params.id
	let status = await usersDB_BL.deleteUserDB(userId)
	return resp.json(status)
})

module.exports = router;
