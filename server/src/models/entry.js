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
  isDeleted: {
      type: Boolean
  },

  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  scope: { type: mongoose.Schema.Types.ObjectId, ref: 'Scope' },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }]
}, {timestamps: true});

const Entry = mongoose.model('Entry', entrySchema);

export default Entry;
