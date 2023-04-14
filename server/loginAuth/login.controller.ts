import { Request, Response } from "express";
import UserSchema from "./login.schema";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

export const UserResgister = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const user = await UserSchema.create({ ...body, password: hashPassword });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const user = await UserSchema.find();
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send(error);
  }
};
export const getUsersById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await UserSchema.findById(id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const updateUserbyId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await UserSchema.findOneAndUpdate({ id });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send(error);
  }
};
export const deleteUserbyId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await UserSchema.deleteOne({ id });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ message: "email and password required" });
  }
  try {
    const user = await UserSchema.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "email not found" });
    } else {
      const confirmPwd = await bcrypt.compare(password, user.password);
      if (!confirmPwd) {
        return res.status(400).json({ message: "password not match" });
      } else {
        const token = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET!)
        return res.status(200).json({ token:token});
      }
    }
    
  } catch (error) {
    return res.status(500).send(error);
  }
};
