import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true
    }
});

const Tag = mongoose.model("Tag", tagSchema);

export default Tag;