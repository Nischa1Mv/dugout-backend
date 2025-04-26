import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', function (_, res) {
    res.send('working');
});

export default app;