const user = require("../models/user");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signToken = (user) => {
  try {
    return jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
  } catch (error) {
    return res.status(400).json({ msg: "Error Creating JWT Token" });
  }
};
const createSendToken = (user, statusCode, res) => {
    const userObj = user.toObject();
    console.log(userObj.role);


  const token = signToken(user);
  const cookieOptions = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  if(userObj.role == 'admin'){
    return res.status(201).json({msg: 'Admin logged in', data: user})
  }

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

// Controller to create a new user
module.exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);


    createSendToken(newUser, 201, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Opps! Something went wrong. Try Again" });
  }
};

module.exports.loginUser = async (req, res) => {
  try {

    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res
        .status(400)
        .json({ error: "Please provide email/phone  and password" });
    }
    const user = await User.findOne({
      $or: [{ email: identifier }, { phoneNumber: identifier }],
    });

    const accountStatus = user.userStatus;

    

    if (accountStatus == "Active") {
      if (!user || !(await user.correctPassword(password, user.password))) {
        return res
          .status(401)
          .json({ error: "Incorrect email/phone or password" });
      }

      createSendToken(user, 200, res);
    }

    if (accountStatus == "Pending"){
        res.status(500).json({ error: "Unauthorized Access! Please wait your approval is Pending" });
    }

    if (accountStatus == "Blocked"){
        res.status(500).json({ error: "Unauthorized Access! Please contact admin. Your access is Blocked" });
    }

    if (accountStatus == "Deleted"){
        res.status(500).json({ error: "Unauthorized Access! Please contact admin. Your account was deleted" });
    }

    if (accountStatus == "Rejected"){
        res.status(500).json({ error: "Unauthorized Access! Please contact admin. Your approval request was Rejected" });
    }
    

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.updateUserStatusById = async (req, res) => {
    try {
      const { id } = req.params;
      const { userStatus } = req.body;
  
      if (!userStatus || !User.schema.path('userStatus').enumValues.includes(userStatus)) {
        return res.status(400).send({ error: 'Invalid user status provided' });
      }
  
      const user = await User.findByIdAndUpdate(id, { userStatus }, { new: true });
  
      if (!user) {
        return res.status(404).send({ error: 'User not found' });
      }
  
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  };