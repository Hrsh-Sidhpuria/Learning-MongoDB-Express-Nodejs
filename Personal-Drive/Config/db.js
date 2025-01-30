import mongoose from "mongoose";
import dotenv from "dotenv";

function ConnectToDB() {
  dotenv.config();
  mongoose.connect(process.env.Mongo_URI).then(() => {
    console.log("connected to Database");
  });
}

export default ConnectToDB;
