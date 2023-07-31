import { Schema, model, models } from "mongoose";

const CommentSchema = new Schema(
  {
    user: String,
    image: String,
    content: String,
    email: String,
    post: {
      type: Schema.Types.ObjectId
    },
  },
  {
    timestamps: true
  }
);

const Comments = models.Comments || model("Comments", CommentSchema);

export default Comments;
