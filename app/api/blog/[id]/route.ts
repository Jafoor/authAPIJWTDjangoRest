import connectMongo from "@/app/utils/connectMongo";
import Blog from "@/app/models/blogPost";
import { NextResponse } from "next/server";

type TopicsParams = {
  id: string;
};

type TopicsProps = {
  params: TopicsParams;
};

export async function PUT(request: any, { params }: TopicsProps) {
  const { id } = params;
  const data = await request.json();

  await connectMongo();
  await Blog.findByIdAndUpdate(id, { ...data.data });
  return NextResponse.json({ message: "updated" }, { status: 200 });
}

export async function DELETE(request: any, { params }: TopicsProps) {
  const { id } = params;
  await connectMongo();
  await Blog.deleteOne({ _id: id });

  return NextResponse.json({ message: "Deleted" }, { status: 200 });
}

export async function GET(request: any, { params }: TopicsProps) {
  const { id } = params;
  await connectMongo();
  const blogs = await Blog.findOne({ _id: id });

  return NextResponse.json({ blogs }, { status: 200 });
}
