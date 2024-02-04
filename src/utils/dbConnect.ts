import mongoose from "mongoose";


const MONGO_URL = "";

export default function dbConnect() {
  mongoose.connect(MONGO_URL, {
    dbName: "links",
  });
}
