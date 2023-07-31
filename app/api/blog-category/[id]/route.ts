import connectMongo from "@/app/utils/connectMongo";
import BlogCategory from "@/app/models/blogCategory";
import { NextResponse } from "next/server";

type CategoryParams = {
  id: string;
};

type CategoryProps = {
  params: CategoryParams;
};

export async function PUT(request: any, { params }: CategoryProps) {
  const { id } = params;
  const data = await request.json();

  await connectMongo();
  await BlogCategory.findByIdAndUpdate(id, { ...data.data });
  return NextResponse.json({ message: "Category updated" }, { status: 200 });
}

export async function DELETE(request: any, { params }: CategoryProps) {
  const { id } = params;
  await connectMongo();
  await BlogCategory.deleteOne({ _id: id });

  return NextResponse.json({ message: "Deleted" }, { status: 200 });
}

export async function GET(request: any, { params }: CategoryProps) {
  const { id } = params;
  await connectMongo();
  const category = await BlogCategory.findOne({ _id: id });

  return NextResponse.json({ category }, { status: 200 });
}
