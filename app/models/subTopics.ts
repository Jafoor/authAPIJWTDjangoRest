import { Schema, model, models } from "mongoose";

const SubTopicsSchema = new Schema({
  name: String,
});

const SubTopics = models.SubTopics || model("SubTopics", SubTopicsSchema);

export default SubTopics;
