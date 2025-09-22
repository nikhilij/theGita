import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  avatar: { type: String },
  bookmarks: [{
    chapter: { type: Number, required: true },
    verse: { type: Number, required: true },
  }],
  progress: [{
    chapter: { type: Number, required: true },
    completed_verses: [{ type: Number }],
  }],
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
