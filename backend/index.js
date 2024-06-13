const express = require("express");
const bodyParser = require("body-parser");
const connectionDB = require("./config/db");
const path = require("path");
const cors = require("cors");
//? routes
const userRoute = require("./router/userRouter");
const studentRoute = require("./router/studentRouter");

const app = express();
const port = 8000;

connectionDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// static path 
app.use("/uploads", express.static(path.join(__dirname, "public/upload")));
//?route middleware
app.use("/api", userRoute);
app.use("/api", studentRoute);

app.listen(port, () => {
  console.log(`Server is running at the port ${port}`);
});
