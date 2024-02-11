//imports
import mongoose from "mongoose";

//Create a new mongoose schema
const noteSchema = mongoose.Schema({
    _id: String,
    content: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
    },
});

//Create a new mongoose model from the schema
export default mongoose.model("Note", noteSchema);
