import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import UserModel from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { verifyToken } from "../middleware/verifyToken";
const authRouter = express.Router();



authRouter.post(
  "/login",
  [
    body("password", "Password is required").isString(),
    body("email", "Email is required").isEmail(),
  ],
  async function (req: Request, res: Response) {
    // validations of user
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("login", errors)
      return res.status(400).json({
        message: errors.array(),
      });
    }

    //login logic
    try {
        const {email, password} = req.body;
        const user = await  UserModel.findOne({email});
        if(!user) {
            return res.status(400).json({
                message: "Invalid Creds"
            })
        }
        const isValidUser = bcrypt.compare(password, user.password);

        if(!isValidUser) {
            return res.status(400).json({
                message: "Invalid Creds"
            })
        } 

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET_KEY as string, {
            expiresIn: "1d"
        })

        res.cookie("auth_token", token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV == "production",
            maxAge: 86400000
        })

        return res.status(200).json( {
            userId : user._id
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Something went wrong"
        })
    }
  }
);

authRouter.get("/validate-token", verifyToken, (req : Request, res : Response) => {
  res.status(200).json({
    userId: req.userId
  })
})

authRouter.post("/logout", (req : Request, res : Response) => {
  res.cookie('auth_token', "", {
    expires: new Date(0),
    httpOnly: true
  })
  res.status(200).json({
    message: "Logged Out succesfully"
  })
})

export default authRouter