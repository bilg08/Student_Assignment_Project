const connectDB = require("./mongoDb");
const bodyParser = require('body-parser');
const express = require("express");
const dotenv = require("dotenv");
const multer = require('multer')
const cors = require("cors");
const advertisingRouter = require("./router/ad.js");
const errorHandler = require("./middleware/error");
const userRouter = require("./router/user.js");
const postRouter = require("./router/post");
const fileupload = require("express-fileupload")
dotenv.config({ path: "./config.env" });

const app = express();
app.use(cors())

app.use(express.json());
app.use(fileupload())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//advertising router
app.use("/advertisings", advertisingRouter);
app.set("view engine", "ejs");
app.use("/post", postRouter);
//users router
app.use("/users", userRouter);
app.use(errorHandler);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
  }
});

const upload = multer({ storage: storage });


connectDB();
app.listen(process.env.PORT, () => {
  console.log(`${process.env.PORT} listening `);
});
