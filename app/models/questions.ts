import { Schema, model, models } from "mongoose";

const QuestionsSchema = new Schema(
  {
    user: String,
    question: String,
    answer: String,
    level: Number,
    important: Number,
    isPublished: Boolean,
    topic: {
      type: Schema.Types.ObjectId,
      ref: "Topics",
    },
    subTopic: {
      type: Schema.Types.ObjectId,
      ref: "SubTopics",
    },
  },
  {
    timestamps: true,
  }
);

const Questions = models.Questions || model("Questions", QuestionsSchema);

export default Questions;
