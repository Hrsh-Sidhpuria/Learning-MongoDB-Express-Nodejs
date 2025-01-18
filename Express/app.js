import express, { json, urlencoded } from "express";

const app = express();

app.set("view engine", "ejs");

//building a MiddleWare

//middleware are of three type (inbuild, custom ,thirdparty middleware) this is custom middleware
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
app.listen(3000);
