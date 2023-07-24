import connectMongo from "@/app/utils/connectMongo";
import SubTopics from "@/app/models/subTopics";
import { NextResponse } from "next/server";

type TopicsParams = {
  id: string;
};

type TopicsProps = {
  params: TopicsParams;
};

export async function POST(request: any) {
  const { name, topic, title, shortDescription, topDescription, keywords, image } = await request.json();
  await connectMongo();
  await SubTopics.create({ name, topic, title, shortDescription, topDescription, keywords, image });
  return NextResponse.json({ message: "Sub Topic Created" }, { status: 201 });
}

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
  const topics = await SubTopics.find({ topic: id });
  return NextResponse.json({ topics }, { status: 200 });
}
