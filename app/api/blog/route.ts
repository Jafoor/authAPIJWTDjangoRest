import connectMongo from "@/app/utils/connectMongo";
import Blog from "@/app/models/blogPost";
import { NextResponse } from "next/server";

export async function POST(request: any) {
  const data = await request.json();

  await connectMongo();
  await Blog.create({ ...data.data });
  return NextResponse.json({ message: "Category Created" }, { status: 201 });
}

export async function GET() {
  await connectMongo();
  const resources = await Blog.find();
  return new Response(JSON.stringify(resources), { status: 200 });
}
