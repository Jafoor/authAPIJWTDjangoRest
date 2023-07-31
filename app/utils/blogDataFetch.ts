const APP_URI = process.env.APP_URI;
import connectMongo from "@/app/utils/connectMongo";
import BlogCategory from "@/app/models/blogCategory";
import Blog from "../models/blogPost";

type FormData = {
  id?: string;
  user?: string;
  title?: string;
  shortDescription?: string;
  image?: string;
  description?: string;
  isPublished?: boolean;
  topNews?: boolean;
  topOthers?: boolean;
  tag?: string;
  popular?: boolean;
  category?: string;
  categoryName?: string;
};

export async function createCategory(category: String) {
  try {
    await connectMongo();
    await BlogCategory.create({ name: category });
    return true;
  } catch (err) {
    return false;
  }
}

export async function getAllCategory() {
  await connectMongo();
  const category = await BlogCategory.find();
  return category;
}

export async function getCategoryDetails(category: string) {
  await connectMongo();
  const categoryDetails = await BlogCategory.findOne({ slug: category });
  return categoryDetails;
}

export async function updateCategoryDetails(id: string, name: string) {
  try {
    await connectMongo();
    const categoryDetails = await BlogCategory.findOneAndUpdate(
      { _id: id },
      { name }
    );
    return true;
  } catch (err) {
    return false;
  }
}

export async function createBlog(data: FormData) {
  try {
    await connectMongo();
    await Blog.create(data);
    return true;
  } catch (err) {
    return false;
  }
}

export async function getAllBlog() {
  await connectMongo();
  const blog = await Blog.find({}, { description: 0, __v: 0 }).sort({
    createdAt: -1
  });
  return blog;
}

export async function getBlogDetails(slug: string) {
  await connectMongo();
  const blogDetails = await Blog.findOne({ slug: slug });
  return blogDetails;
}

export async function getBlogsByCategory(id: string) {
  await connectMongo();
  const blogs = await Blog.find({ category: id });
  return blogs;
}

export async function getBlogsForHome() {
  await connectMongo();
  const blogs = await Blog.find({ topOthers: true }).limit(2);
  return blogs;
}

export async function updateBlogDetails(data: FormData) {
  try {
    await connectMongo();
    const blogDetails = await Blog.findOneAndUpdate(
      { _id: data.id },
      { ...data }
    );
    return true;
  } catch (err) {
    return false;
  }
}
