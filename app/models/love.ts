import { Schema, model, models } from "mongoose";

const LoveSchema = new Schema(
  {
    number: Number,
    post: {
      type: Schema.Types.ObjectId
    },
  },
  {
    timestamps: true
  }
);

const Loves = models.Loves || model("Loves", LoveSchema);

export default Loves;
