import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import petRoute from "./api/Routes/Pet.js";
import categoryRoute from "./api/Routes/Category.js";
import fileUpload from 'express-fileupload';
import path from "path";
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();
app.use(morgan("common"));
app.use(cors({ origin:true, credentials:true }));
app.use(express.json());

app.use(fileUpload())
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/images", express.static(path.join(__dirname, "./public/images")))

app.use('/api/category', categoryRoute);
app.use('/api/pet', petRoute);

app.listen(process.env.APP_PORT, () => {
    console.log(`Server listening on http://localhost:${process.env.APP_PORT}`);
})

