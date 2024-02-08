import mongoose from "mongoose";

const noteSchema = mongoose.Schema({
    _id: String,
    content: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
    },
});

export default mongoose.model("Note", noteSchema);