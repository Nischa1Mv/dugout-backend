import express, { Request, Response } from "express";
import cors from "cors";
// import signup from "./auth/signup.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (_: Request, res: Response) => {
  res.send('working');
});

// app.post('/signup', signup);

export default app;
