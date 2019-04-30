import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  }
});

// //  pre hook to our user schema to remove all messages of this user on its deletion
// userSchema.pre('remove', function(next) {
//     this.model('Message').deleteMany({ user: this._id }, next);
//   });

const User = mongoose.model('User', userSchema);

export default User;