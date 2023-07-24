import connectMongo from "@/app/utils/connectMongo";
import Resources from "@/app/models/resourcePost";
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
  await Resources.findByIdAndUpdate(id, { ...data.data });
  return NextResponse.json({ message: "Sub Topic updated" }, { status: 200 });
}

export async function DELETE(request: any, { params }: TopicsProps) {
  const { id } = params;
  await connectMongo();
  await Resources.deleteOne({ _id: id });
  
  return NextResponse.json({ message: "Deleted" }, { status: 200 });
}

export async function GET(request: any, { params }: TopicsProps) {
  const { id } = params;
  await connectMongo();
  const resources = await Resources.findOne({ _id: id });
  
  return NextResponse.json({ resources }, { status: 200 });
}
