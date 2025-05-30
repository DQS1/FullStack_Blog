import mongoose from "mongoose";

async function connect() {
  const DB_URL = process.env.DB_URL;
  try {
    await mongoose.connect(DB_URL);
    console.log("Connect successfully!!!");
  } catch (error) {
    console.log("Connect failure!!!", error);
  }
}

export default connect;
