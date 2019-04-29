import mongoose from 'mongoose';

const scopeSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true
    }
});

const Scope = mongoose.model("Scope", scopeSchema);

export default Scope;