import { Schema, model, models } from "mongoose";

const SubTopicsSchema = new Schema(
  {
    title: String,
    slug: String,
    topDescription: String,
    shortDescription: String,
    keywords: String,
    image: String,
    name: String,
    topic: {
      type: Schema.Types.ObjectId,
      ref: "Topics"
    }
  },
  {
    timestamps: true
  }
);

const SubTopics = models.SubTopics || model("SubTopics", SubTopicsSchema);

export default SubTopics;
