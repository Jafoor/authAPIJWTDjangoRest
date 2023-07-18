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
  const { name, topic } = await request.json();
  await connectMongo();
  await SubTopics.findByIdAndUpdate(id, { name, topic });
  return NextResponse.json({ message: "Sub Topic updated" }, { status: 200 });
}

export async function GET(request: any, { params }: TopicsProps) {
  const { id } = params;
  await connectMongo();
  const subTopics = await SubTopics.findOne({ _id: id });
  
  return NextResponse.json({ subTopics }, { status: 200 });
}
