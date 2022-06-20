const express = require("express")
const subscriptionsBL = require("../BLs/subscriptionsBL")
const router = express.Router()

//Controller for the subscriptions

//get all
router.route("/").get(async (req, resp) => {
	let data = await subscriptionsBL.getAllSubscriptions()
	return resp.json(data)
})

//get by id
router.route("/:id").get(async (req, resp) => {
	let subscriptionId = req.params.id
	let data = await subscriptionsBL.getSubscriptionById(subscriptionId)
	return resp.json(data)
})

//add
router.route("/").post(async (req, resp) => {
	let newSubscription = req.body
	let data = await subscriptionsBL.addSubscription(newSubscription)
	return resp.json(data)
})

//update
router.route("/:id").put(async (req, resp) => {
	let subscriptionId = req.params.id
	let updateSubscription = req.body
	let status = await subscriptionsBL.updateSubscription(subscriptionId, updateSubscription)
	return resp.json(status)
})

//delete
router.route("/:id").delete(async (req, resp) => {
	let subscriptionId = req.params.id
	let status = await subscriptionsBL.deleteSubscription(subscriptionId);
	return resp.json(status)
})

module.exports = router;
