const connectDB = require("./mongoDb");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const advertisingRouter = require("./router/ad.js");
const errorHandler = require("./middleware/error");
const userRouter = require("./router/user.js");
const postRouter = require("./router/post");
dotenv.config({ path: "./config.env" });

const app = express();
app.use(express.json());

//advertising router
app.use("/advertisings", advertisingRouter);
app.use("/post", postRouter);
//users router
app.use("/users", userRouter);
app.use(errorHandler);

connectDB();
app.listen(process.env.PORT, () => {
  console.log(`${process.env.PORT} listening `);
});
