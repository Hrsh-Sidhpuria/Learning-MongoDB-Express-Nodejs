import express, { json, urlencoded } from "express";
import userModel from "./Public/Models/User.js";
import connection from "./Config/db.js";

const app = express();

app.set("view engine", "ejs");

//building a MiddleWare

//middleware are of three type (inbuild, custom, thirdparty middleware) this is custom middleware
// app.use((res, resp, next) => {
//   console.log("This is a MiddleWare");
//   next();
// });

//we have to use 2 inbuild middleware when we try to access data coming through post method.
//because express cant read data coming through post method.
app.use(express.json());
app.use(urlencoded({ extended: true }));

//When we link css file to our project we need to use middleware to pass file from Backend to Frontend .
//css files,images,png we put it in public folder (basically we put every static file in public folder)
//
app.use(express.static("Public"));

app.get("/", (req, res) => {
  res.render("Index");
});

app.get("/about", (req, res) => {
  res.send("This is About page");
});
app.get("/form", (req, res) => {
  res.render("form");
});

//getting form data
app.post("/formData", (req, res) => {
  console.log(req.body);
  console.log(req.body.name);

  res.send("Data Recieved");
});

app.get("/register", (req, res) => {
  res.render("register");
});

// CRUD Operation
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  //create operation
  await userModel.create({
    username: name,
    email: email,
    password: password,
  });
  res.send("User Registered successfully");
});

//Read operation
app.get("/getuser", (req, res) => {
  userModel.find().then((user) => res.send(user));
});
app.get("/getuser/:name", (req, res) => {
  userModel.find({ username: req.params.name }).then((user) => res.send(user));
});
//findone() this function is use to fetch only one user irrespective to how many user with same value is there it return the first user matches.

//Update Operation
//method findoneandupdate() this method is use to update the value according to the contition
app.get("/updateEmail", async (req, res) => {
  await userModel.findOneAndUpdate(
    { username: "harsh" },
    { email: "harsh@gmail.com" }
  );

  res.send("value updated successfully");

  //here first {} contain the condition where we want to make a update and second {} contain the updated value which we want to update
});

//Delete Operation
//here method findoneanddelete({}) is use to delete a specific user according to the condition given in {}

app.listen(3000);
