import mongoose from "mongoose";

const connection = mongoose.connect("mongodb://0.0.0.0/Demo").then(() => {
  console.log("connected");
});

export default connection;
