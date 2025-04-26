import express from "express";
import jwt from "jsonwebtoken";
import User from "./models/User.js";
import { compareSync } from "bcryptjs";

const router = express.Router();

router.post("/", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({
            message: "Send all the required data (email, password)",
        });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).send({ message: "User not found" });
        }

        if (!compareSync(password, user.password)) {
            return res.status(401).send({ message: "Incorrect password" });
        }

        if (!process.env.SECRET) {
            return res.status(500).send({ message: "JWT secret not configured" });
        }

        const payload = { id: user._id };
        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "10d" });

        return res.status(200).send({
            message: "Successfully logged in",
            token: "Bearer " + token,
            user: {
                id: user._id
            }
        });

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

export default router;