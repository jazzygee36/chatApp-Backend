import { Schema, model } from "mongoose";

interface IUser {
  username: String;
  confirmPassword: String;
  email: String;
  password: String | any;
}

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    require: true,
  },

  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  confirmPassword: {
    type: String,
    require: true,
  },
});

const User = model("user", UserSchema);
export default User;