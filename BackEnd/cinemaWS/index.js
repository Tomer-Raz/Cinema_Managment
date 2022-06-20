const express = require("express");
const cors = require("cors");
require("./configs/usersDataBase");

const permissionsJsonController = require("./usersDBcontrollers/permissionsJsonController");
const usersDBController = require("./usersDBcontrollers/usersDBController");
const usersJsonController = require("./usersDBcontrollers/usersJsonController");

const membersDAL = require("./subscriptionDBcontrollers/membersDAL");
const moviesDAL = require("./subscriptionDBcontrollers/moviesDAL");
const subscriptionsDAL = require("./subscriptionDBcontrollers/subscriptionsDAL");

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/cinema/permissionsJson", permissionsJsonController);
app.use("/cinema/usersDB", usersDBController);
app.use("/cinema/usersJson", usersJsonController);

app.use("/cinema/subscriptions/members", membersDAL);
app.use("/cinema/subscriptions/movies", moviesDAL);
app.use("/cinema/subscriptions/subscriptions", subscriptionsDAL);

app.listen(8001, console.log("Server running on port 8001"));
