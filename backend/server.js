const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const connectDB = require("./mongoDb");
const userRouter = require("./router/user.js");
const postRouter = require("./router/post");
const chatRouter = require('./router/chat')
const dotenv = require("dotenv");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const http = require("http").Server(app);
const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));


const fileupload = require("express-fileupload");
dotenv.config({ path: "./config.env" });

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

socketIO.on("connection", (socket) => {
  console.log('socket')
  socket.on("chat message", (msg) => {
    console.log("msg");
    socketIO.emit("chat message", msg);
  });
  socket.on("disconnect", (socket) => {
    console.log("userDisconnected");
  });
});

connectDB();
app.use(fileupload());
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())l

//advertising router
// app.set("view engine", "ejs");

app.use("/post", postRouter);
app.use('/chat',chatRouter)
//users router
app.use("/users", userRouter);
app.use(errorHandler);

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//       cb(null, 'uploads')
//   },
//   filename: (req, file, cb) => {
//       cb(null, file.fieldname + '-' + Date.now())
//   }
// });

// const upload = multer({ storage: storage });

http.listen(process.env.PORT, () => {
  console.log(`${process.env.PORT} listening `);
});
