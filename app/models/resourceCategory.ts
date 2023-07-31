import { Schema, model, models } from "mongoose";

const ResourceCategorySchema = new Schema(
  {
    name: String,
    description: String,
    image: String,
    title: String,
    slug: String,
    topDescription: String,
    keywords: String
  },
  {
    timestamps: true
  }
);

const ResourceCategory =
  models.ResourceCategory || model("ResourceCategory", ResourceCategorySchema);

export default ResourceCategory;
