const UserSchema = require("../model/user");
const bcrypt = require('bcrypt')
const asyncHandler = require('../middleware/asyncHandler');
const MyError = require('../utils/myError');
const jwt = require('jsonwebtoken')
exports.login =  asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email,password)
  if (!email || !password) {
    throw MyError("EMAIL NUUTS UGEE ORUULNA UU", 400);
  }
  let user = await UserSchema.findOne({ email }).select("+password");
  if (!user) {
    throw MyError("EMAIL NUUTS UG BURUU BAINA", 400);
  }
  const ok = await bcrypt.compare(password, user.password);  
  if (ok) {
    const token = user.generateJWT();
    res.status(200).json({
      token
    })
  }
})

exports.createUser = async (req, res) => {
  try {
    const user = await UserSchema.create(req.body);
    const token = user.generateJWT();
    res.status(200).json({
      data:user,
      token
    });  
    } catch (error) {
      res.status(400).json({
        error:error.message
      }); 
    }
};
exports.checkJwt = async(req, res) => {
  const { token } = req.body;
  const user =  jwt.verify(token, "SECRET_KEY_JWT");
  res.status(200).json({user})
}
