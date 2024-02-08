import express from "express";
import routes from "./routes.mjs";
import path from "path";
import {fileURLToPath} from 'url';
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Connect to mongoDB
dotenv.config();
const uri = process.env.MONGODBSTRING;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "../frontend")))

app.use((error, request, response, next) => {
    console.error(error.stack);
    response.status(500).json({ error: 'Internal Server Error' });
});

app.use("/", routes);

app.listen(port);