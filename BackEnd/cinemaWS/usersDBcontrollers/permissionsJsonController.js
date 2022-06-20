const express = require("express")
const permissionsBL = require("../BLs/permissionsBL")
const router = express.Router()

//Controller for the permissions json file

//get all
router.route("/").get(async (req, resp) => {
	let data = await permissionsBL.getAllPermissionsJson()
	return resp.json(data)
})

//get by id
router.route("/:id").get(async (req, resp) => {
	let permissionId = req.params.id
	let data = await permissionsBL.getPermissionByIdJson(permissionId)
	return resp.json(data)
})

//add
router.route("/").post(async (req, resp) => {
	let newPermission = req.body
	let data = await permissionsBL.addPermissionJson(newPermission)
	return resp.json(data)
})

//update
router.route("/:id").put(async (req, resp) => {
	let permissionId = req.params.id
	let updatePermission = req.body
	let status = await permissionsBL.updatePermissionJson(permissionId, updatePermission)
	return resp.json(status)
})

//delete
router.route("/:id").delete(async (req, resp) => {
	let permissionId = req.params.id
	let status = await permissionsBL.deletePermissionJson(permissionId)
	return resp.json(status)
})

module.exports = router;
