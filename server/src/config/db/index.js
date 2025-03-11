import mongoose from "mongoose";

async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://sangdoquang1:Wd5NnKzN4iKGHVzx@cluster0.2rfcm.mongodb.net/data"
    );
    console.log("Connect successfully!!!");
  } catch (error) {
    console.log("Connect failure!!!", error);
  }
}

export default connect;
