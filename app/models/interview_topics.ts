import { Schema, model, models } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const TopicsLists = new Schema(
  {
    id: {
      type: String,
      default: uuidv4,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TopicsSchema = new Schema({
  name: String,
  topics: [TopicsLists],
});

const Topics = models.Topics || model("Topics", TopicsSchema);

export default Topics;
