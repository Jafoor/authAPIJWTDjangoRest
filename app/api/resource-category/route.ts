import connectMongo from "@/app/utils/connectMongo";
import ResourceCategory from "@/app/models/resourceCategory";
import { NextResponse } from "next/server";

export async function POST(request: any) {
  const { name, description, image } = await request.json();
  await connectMongo();
  await ResourceCategory.create({ name, description, image });
  return NextResponse.json({ message: "Category Created" }, { status: 201 });
}

export async function GET() {
  await connectMongo();
  const categories = await ResourceCategory.find();
  return new Response(JSON.stringify(categories), { status: 200 });
}
