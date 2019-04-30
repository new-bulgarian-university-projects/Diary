import mongoose from 'mongoose';

const scopeSchema = new mongoose.Schema({
    friendlyText: {
        type: String,
        required: true
    },
    scope: {
        type: String,
        required: true,
        unique: true
    }
});

const Scope = mongoose.model("Scope", scopeSchema);

export default Scope;