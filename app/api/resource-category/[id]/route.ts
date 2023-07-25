import connectMongo from "@/app/utils/connectMongo";
import ResourceCategory from "@/app/models/resourceCategory";
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
  await ResourceCategory.findByIdAndUpdate(id, { ...data.data });
  return NextResponse.json({ message: "Category updated" }, { status: 200 });
}

export async function DELETE(request: any, { params }: CategoryProps) {
  const { id } = params;
  await connectMongo();
  await ResourceCategory.deleteOne({ _id: id });
  
  return NextResponse.json({ message: "Deleted" }, { status: 200 });
}

export async function GET(request: any, { params }: CategoryProps) {
  const { id } = params;
  await connectMongo();
  const category = await ResourceCategory.findOne({ _id: id });
  
  return NextResponse.json({ category }, { status: 200 });
}
