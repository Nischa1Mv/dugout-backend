import express from "express";
import cors from "cors";
import login from "./login.js";
import signup from "./signup.js"

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', function (_, res) {
    res.send('working');
});

app.use('/login',login);
app.use('/signup', signup);
export default app;