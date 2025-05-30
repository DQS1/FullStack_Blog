import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
