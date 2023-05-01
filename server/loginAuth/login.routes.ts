import express from "express";
import {
  UserResgister,
  getAllUsers,
  getUsersById,
  deleteUserbyId,
  updateUserbyId,
  userLogin,
  verifyToken,
} from "./login.controller";
const route = express.Router();

route.post("/register", UserResgister);
route.get("/users", getAllUsers);
route.get("/user/token", verifyToken);
route.get("/user/:id", getUsersById);
route.delete("/user/:id", deleteUserbyId);
route.patch("/user/:id", updateUserbyId);
route.post("/user/login", userLogin);

export default route;
