import express, { urlencoded } from "express";
import userRouter from "./Routes/User.route.js";
import ConnectToDB from "./Config/db.js";
import User from "./models/user.model.js";

ConnectToDB();

const app = express();
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use("/user", userRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
