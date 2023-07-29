import connectMongo from "@/app/utils/connectMongo";
import SubTopics from "@/app/models/subTopics";
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
  console.log(data);

  await connectMongo();
  const x = await SubTopics.findByIdAndUpdate(id, { ...data.data });
  console.log(x);

  return NextResponse.json({ message: "Sub Topic updated" }, { status: 200 });
}

export async function DELETE(request: any, { params }: TopicsProps) {
  const { id } = params;
  await connectMongo();
  await SubTopics.deleteOne({ _id: id });

  return NextResponse.json({ message: "Deleted" }, { status: 200 });
}

export async function GET(request: any, { params }: TopicsProps) {
  const { id } = params;
  await connectMongo();
  const subTopics = await SubTopics.findOne({ _id: id });

  return NextResponse.json({ subTopics }, { status: 200 });
}
