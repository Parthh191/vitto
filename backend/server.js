import dotenv from "dotenv";
import app from "./src/index.js";

dotenv.config();

const PORT = process.env.PORT;

if (!PORT) {
  console.error("PORT is not defined in .env file");
  process.exit(1);
}

const start = async () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    console.log(`Environment: ${process.env.NODE_ENV}`)
  })
}

start()