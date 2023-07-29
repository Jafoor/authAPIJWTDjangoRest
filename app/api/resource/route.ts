import connectMongo from "@/app/utils/connectMongo";
import Resources from "@/app/models/resourcePost";
import { NextResponse } from "next/server";

export async function POST(request: any) {
  const data = await request.json();

  await connectMongo();
  await Resources.create({ ...data.data });
  return NextResponse.json({ message: "Category Created" }, { status: 201 });
}

export async function GET() {
  await connectMongo();
  const resources = await Resources.find();
  return new Response(JSON.stringify(resources), { status: 200 });
}
