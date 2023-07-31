import connectMongo from "@/app/utils/connectMongo";
import BlogCategory from "@/app/models/blogCategory";
import { NextResponse } from "next/server";

export async function POST(request: any) {
  const { name, description, image, keywords, slug, topDescription, title } = await request.json();
  await connectMongo();
  await BlogCategory.create({ name, description, image, keywords, slug, topDescription, title });
  return NextResponse.json({ message: "Category Created" }, { status: 201 });
}

export async function GET() {
  await connectMongo();
  const categories = await BlogCategory.find();
  return new Response(JSON.stringify(categories), { status: 200 });
}
