const express = require('express');
const route = express.Router();

const { getUser, getUserById, createUser, deleteUserById, updateUserById } = require('../controllers/usersController');


route.get('/user', getUser)
route.post('/user', createUser )
route.get('/user/:id', getUserById)
route.delete('/user/:id', deleteUserById)
route.patch('/user/:id', updateUserById )

module.exports = {
    route
}