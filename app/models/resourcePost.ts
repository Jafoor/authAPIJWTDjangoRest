import { Schema, model, models } from "mongoose";

const ResourceSchema = new Schema(
  {
    user: String,
    title: String,
    shortDescription: String,
    keywords: String,
    image: String,
    description: String,
    isPublished: Boolean,
    topNews: Boolean,
    topOthers: Boolean,
    tag: String,
    popular: Boolean,
    slug: String,
    category: {
      type: Schema.Types.ObjectId,
      ref: "ResourceCategory"
    },
    categoryName: String
  },
  {
    timestamps: true
  }
);

const Resources = models.Resources || model("Resources", ResourceSchema);

export default Resources;
