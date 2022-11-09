const UserSchema = require("../model/user");
const bcrypt = require('bcrypt')
const asyncHandler = require('../middleware/asyncHandler');
const MyError = require('../utils/myError')
exports.login =  asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw MyError("EMAIL NUUTS UGEE ORUULNA UU", 400);
  }
  let user = await UserSchema.findOne({ email }).select("+password");
  if (!user) {
    throw MyError("EMAIL NUUTS UG BURUU BAINA", 400);
  }
  if(await bcrypt.compare(req.body.password,user.password)) {
    const token = user.generateJWT();
    res.status(200).json({
      status:true,
      token
    })
  }else{
    res.status(400).json({
      status:false,
      error:"Нууц үг буруу байна"
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
