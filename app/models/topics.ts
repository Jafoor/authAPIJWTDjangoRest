import { Schema, model, models } from "mongoose";

const TopicsSchema = new Schema({
  name: String
});

const Topics = models.Topics || model("Topics", TopicsSchema);

export default Topics;
