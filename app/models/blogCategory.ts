import { Schema, model, models } from "mongoose";

const BlogCategorySchema = new Schema(
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

const BlogCategory =
  models.BlogCategory || model("BlogCategory", BlogCategorySchema);

export default BlogCategory;
