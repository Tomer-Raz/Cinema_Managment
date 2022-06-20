const User = require("../models/userModel")

//BL for the usersDB

//get all
const getAllUsersDB = () => {
    return new Promise((resolve, reject) => {
        User.find({}, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

//get by id
const getUserByIdDB = (userId) => {
    return new Promise((resolve, reject) => {
        User.findById(userId, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

//add
const addUserDB = (newUser) => {
    return new Promise((resolve, reject) => {
        let userToSave = new User({
            userName: newUser.userName,
            password: newUser.password,
        })
        userToSave.save((err) => {
            if (err) {
                reject(err)
            } else {
                resolve(userToSave)
            }
        })
    })
}

//update
const updateUserDB = (userId, userToUpdate) => {
    return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(
            userId,
            {
                userName: userToUpdate.userName,
                password: userToUpdate.password,
            },
            (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve("Update User(DB)")
                }
            }
        )
    })
}

//delete
const deleteUserDB = (userId) => {
    return new Promise((resolve, reject) => {
        User.findByIdAndDelete(userId, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve("User Deleted(DB)")
            }
        })
    })
}

module.exports = { getAllUsersDB, getUserByIdDB, addUserDB, updateUserDB, deleteUserDB }