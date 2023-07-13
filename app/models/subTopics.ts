import { Schema, model, models } from "mongoose";

const SubTopicsSchema = new Schema({
  name: String,
  topic: {
    type: Schema.Types.ObjectId,
    ref: "Topics"
  }
});

const SubTopics = models.SubTopics || model("SubTopics", SubTopicsSchema);

export default SubTopics;
