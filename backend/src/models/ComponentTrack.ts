import mongoose from "mongoose";

const componentTrackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  variant: String,
  action: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("ComponentTrack", componentTrackSchema);
