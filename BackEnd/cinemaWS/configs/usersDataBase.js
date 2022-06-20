const mongoose = require("mongoose")

//using mongoose to connect to the users Database from mongo

mongoose.connect("mongodb://localhost:27017/usersDB", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
