import { Schema, model, models } from "mongoose";

const BlogSchema = new Schema(
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
      ref: "BlogCategory"
    },
    categoryName: String
  },
  {
    timestamps: true
  }
);

const Blogs = models.Blogs || model("Blogs", BlogSchema);

export default Blogs;
