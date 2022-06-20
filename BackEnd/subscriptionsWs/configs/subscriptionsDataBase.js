const mongoose = require("mongoose");

//using mongoose to connect to the subscriptions Database from mongo

mongoose.connect("mongodb://localhost:27017/subscriptionsDB", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
