import { Request, Response, NextFunction } from "express";
import UserSchema from "./login.schema";
import bcrypt from "bcrypt";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const TOKEN_KEY: string | any = process.env.TOKEN_KEY;

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const UserResgister = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const confirmPwd = await bcrypt.hash(req.body.password, 10);
    const user = await UserSchema.create({
      ...body,
      password: hashPassword,
      confirmPassword: confirmPwd,
    });
    return res.status(200).json({ success: true, message: "registered", user });
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
    const id = req.body;
    const user = await UserSchema.findOneAndUpdate(id);
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).send(error);
  }
};
export const deleteUserbyId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await UserSchema.findByIdAndRemove(id);
    return res.status(200).json({ message: "deleted", user });
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
      return res.status(404).json({ message: "email not found" });
    } else {
      const confirmPwd = await bcrypt.compare(password, user.password);
      if (!confirmPwd) {
        return res.status(404).json({ message: "password not match" });
      } else {
        const token = jwt.sign({ user }, TOKEN_KEY, {
          expiresIn: "2h",
        });
        return res.status(200).json({ token: token });
      }
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const verifyToken = (req: Request, res: Response) => {
  try {
    const bearer: any = req.headers.authorization;
    const token = bearer.split(" ")[1];

    if (!token) {
      return res
        .status(403)
        .json({ message: "A token is required for authentication" });
    } else {
      jwt.verify(token, TOKEN_KEY, (err: any, decoded: any) => {
        if (err) {
          return res.status(401).json({ auth: false, message: err });
        } else {
          return res.status(200).json({ message: "token decoded", decoded });
        }
      });
    }
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
};

export const sendResetPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_MAIL, // generated ethereal user
        pass: process.env.SMTP_PASSWORD, // generated ethereal password
      },
    });

    const mailOptions = {
      from: process.env.SMTP_MAIL, // sender address
      to: email, // list of receivers
      subject: "Resetting your ChatApp password ", // Subject line
      text: "Please, confirm that you are the one requesting to change your password",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(401).json({ message: "Error" });
      } else {
        return res
          .status(201)
          .json({ message: "email successfully sent" + info.response });
      }
    });
  } catch (err) {
    return res.status(500);
  }
};
