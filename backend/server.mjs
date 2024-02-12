//Imports
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

//Body parsing
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "../frontend/public")))

//Cors Handling
app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(request.method === "OPTIONS") {
        response.header("Access-Control-Allow-Methods", "PUT, POST, PATH, DELETE, GET");
        return response.status(200).json({});
    };
    next();
});

//Error handling
app.use((error, request, response, next) => {
    console.error(error.stack);
    response.status(500).json({ error: 'Internal Server Error' });
});

//Routes
app.use("/", routes);

app.listen(port);
