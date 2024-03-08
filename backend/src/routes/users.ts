import express, { Request, Response } from "express";
import UserModel from "../models/user"
import jwt from "jsonwebtoken"
import {body, validationResult} from "express-validator";

const userRouter = express.Router();

userRouter.post("/register", [
  body("firstName", "First Name is required").isString(),
  body("lastName", "Last Name is required").isString(),
  body("email", "Email is required").isString(),
  body("password", "Password is required and length gt than 6").isLength({min: 6})
], async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()
    })
  }
  try {
    let user = await UserModel.findOne({
        email:req.body.email
    })
    if(user) {
        return res.status(400).json({
            message: "User already exists"
        })
    }
    user = new UserModel(req.body);
    await user.save();
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET_KEY as string, {
        expiresIn:'1d'
    });
    res.cookie("auth_token", token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        maxAge:86400000
    })
    console.log(token, 'token')
    return res.status(200).json({
      message: "User Registered Ok"
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
        message : "Sommething went wrong"
    })
  }
});

export default userRouter;