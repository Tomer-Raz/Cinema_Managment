const express = require("express")
const usersJSON_BL = require("../BLs/usersJSON_BL")
const router = express.Router()

//Controller for the users json file

//get all
router.route("/").get(async (req, resp) => {
	let data = await usersJSON_BL.getAllUsersJson()
	return resp.json(data)
})

//get by id
router.route("/:id").get(async (req, resp) => {
	let userId = req.params.id
	let data = await usersJSON_BL.getUserByIdJson(userId)
	return resp.json(data)
})

//add
router.route("/").post(async (req, resp) => {
	let newUser = req.body
	let data = await usersJSON_BL.addUserJson(newUser)
	return resp.json(data)
})

//update
router.route("/:id").put(async (req, resp) => {
	let userId = req.params.id
	let updateUser = req.body
	let status = await usersJSON_BL.updateUserJson(userId, updateUser)
	return resp.json(status)
})

//delete
router.route("/:id").delete(async (req, resp) => {
	let userId = req.params.id
	let status = await usersJSON_BL.deleteUserJson(userId)
	return resp.json(status)
})

module.exports = router;
