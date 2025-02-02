import express from "express";
import { body, validationResult } from "express-validator";
import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import { decrypt } from "dotenv";
import userModel from "../../Express/Public/Models/User.js";

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
    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword);

    const newUser = await UserModel.create({
      name,
      email,
      password: hashPassword,
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

router.post(
  "/login",
  body("email").trim().isEmail().notEmpty(),
  body("password").notEmpty().isLength({ min: 8 }),
  async (req, res) => {
    const { email, password } = req.body;

    const user = userModel.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        message: "invaid username or password",
      });
    }

    const ismatch = await bcrypt.compare(password, user.password);
    if (ismatch) {
      res.send("valid user");
    } else {
      res.send("invalid user");
    }

    res.send("login successfull");
  }
);

export default router;
