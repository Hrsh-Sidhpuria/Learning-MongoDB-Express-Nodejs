import express from "express";
import { body, validationResult } from "express-validator";
import UserModel from "../models/user.model.js";
const router = express.Router();

router.get("/test", (req, res) => {
  res.send("this is a user test router");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post(
  "/register",
  body("email").trim().isEmail().notEmpty(),
  body("name").trim().notEmpty(),
  body("password").notEmpty().isLength({ min: 8 }),
  async (req, res) => {
    const error = validationResult(req);
    console.log(error);
    if (!error.isEmpty()) {
      return res.send("invalid data");
    }

    console.log(req.body);
    const { name, email, password } = req.body;
    const newUser = UserModel.create({
      name,
      email,
      password,
    });
    let data = {
      email: req.body.email,
    };
    res.render("login", data);
  }
);

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  res.send("login successfull");
});

export default router;
