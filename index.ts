import dotenv from "dotenv";
import app from "./app"; 

dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

startServer();
