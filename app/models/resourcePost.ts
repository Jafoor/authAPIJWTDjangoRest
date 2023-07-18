import { Schema, model, models } from "mongoose";

const ResourceSchema = new Schema(
  {
    user: String,
    question: String,
    answer: String,
    level: Number,
    important: Number,
    isPublished: Boolean,
    topic: {
      type: Schema.Types.ObjectId,
      ref: "ResourceCategory",
    },
  },
  {
    timestamps: true,
  }
);

const Resources = models.Resources || model("Resources", ResourceSchema);

export default Resources;
