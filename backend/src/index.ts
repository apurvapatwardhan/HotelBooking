import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import userRouter from "./routes/users";
import authRouter from "./routes/auth";
import cookieParser from "cookie-parser";
import path from "path";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
    console.log("Connected to DB:")
});


const app = express();
app.use( express.static(path.join(__dirname, "../../frontend/dist")) );
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(
    {
        origin: process.env.FRONTEND_URL,
        credentials: true
    }
));




app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.get("/api/test", async (req: Request, res: Response) => {
  res.json({
    message: "Hello from express",
  });
});

app.listen(8000, () => {
  console.log("server running on 8000");
})
