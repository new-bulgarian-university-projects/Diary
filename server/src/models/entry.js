import mongoose from 'mongoose';

const entrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  isDeleted: {
      type: Boolean
  },

  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  scope: { type: mongoose.Schema.Types.ObjectId, ref: 'Scope' },
});

const Entry = mongoose.model('Message', entrySchema);

export default Entry;
