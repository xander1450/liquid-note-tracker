
import mongoose from "mongoose";

export default mongoose.model("Note", new mongoose.Schema({
  title:String,
  content:String,
  start:String,
  end:String,
  calendarEventId:String
}));
