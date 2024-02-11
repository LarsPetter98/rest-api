//Imports
import express from "express";
import path from "path";
import {fileURLToPath} from 'url';
import mongoose from "mongoose";
import Note from "./mongooseModel.mjs";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Handling get requests
router.get("/", (request, response, next) => {
    response.sendFile(path.join(__dirname, "../frontend/public"), error => {
        if (error) response.status(404).json({message: "Resource was not found"});
    });
});

//Handling post requests
router.post("/", async (request, response, next) => {
    try{
        let objectId = new mongoose.Types.ObjectId().toString();
        objectId = objectId.match(/[a-fA-F0-9]{24}/)[0];
        const note = new Note({
            _id: objectId,
            content: request.body.content
        });
        await note.save();
        response.status(201).json({newNote: note});
    }
    catch(error) {
        response.status(500).json({ error: error.message });
    }
});

//Handling delete requests
router.delete("/", async (request, response, next) => {
    try {
        const content = request.body.content;
        await Note.deleteOne({content: content});
        response.status(200).json({message: "Note deleted"});
    }
    catch (error) {
        response.status(500).json({ error: error.message });
    }
});

export default router;
