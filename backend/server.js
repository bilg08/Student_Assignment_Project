const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const connectDB = require("./mongoDb");
const userRouter = require("./router/user.js");
const postRouter = require("./router/post");
const chatRouter = require('./router/chat');
const schoolRouter = require('./router/school')
const dotenv = require("dotenv");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const http = require("http").Server(app);
const corsOptions = {
  origin: "https://student-assignment-project-front-end.vercel.app/",
};
app.use(cors(corsOptions));


const fileupload = require("express-fileupload");
dotenv.config({ path: "./config.env" });

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "https://student-assignment-project-front-end.vercel.app/",
  },
});

socketIO.on("connection", (socket) => {
  socket.onAny((type,msg) => {
    socketIO.emit(type, msg);
  });
  socket.on("disconnect", (socket) => {
  });
});

connectDB();
app.use(fileupload());
app.use(express.json());


app.use("/post", postRouter);
app.use('/chat', chatRouter);
app.use('/school',schoolRouter)
//users router
app.use("/users", userRouter);
app.use(errorHandler);



http.listen(process.env.PORT, () => {
  console.log(`${process.env.PORT} listening `);
});
