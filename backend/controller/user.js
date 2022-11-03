const UserSchema = require("../model/user");

exports.getUsers = async (req, res) => {
  console.log("get All Users");
};

exports.getUser = async (req, res) => {
  console.log("get selected User");
};

exports.createUser = async (req, res) => {
  // try {
  // const user = await UserSchema.create(req.body);
  // res.status(200).json({
  //   user,
  // });  
  // } catch (error) {
  //   res.status(400).json({
  //     error:error.message
  //   }); 
  // }
};

exports.deleteUser = async (req, res) => {
  console.log("delete User");
};

exports.changeUser = async (req, res) => {
  console.log("change User");
};
