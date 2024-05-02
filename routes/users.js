const express = require("express");
const router = express.Router();
const users = require("../controllers/users");
const {isLoggedIn, isAuthorized} = require('../middleware')



router.post("/add", users.createUser);
router.patch('/admin/user/:id',isLoggedIn,isAuthorized, users.updateUserStatusById);

router.post("/login", users.loginUser);

module.exports = router;