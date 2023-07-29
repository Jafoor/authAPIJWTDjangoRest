import connectMongo from "@/app/utils/connectMongo";
import Question from "@/app/models/questions";
import { NextResponse } from "next/server";

type TopicsParams = {
  id: string;
};

type TopicsProps = {
  params: TopicsParams;
};

type TopicsParamsSlug = {
  slug: string;
};

type TopicsPropsSlug = {
  params: TopicsParamsSlug;
};

export async function PUT(request: any, { params }: TopicsProps) {
  const { id } = params;
  const data = await request.json();

  await connectMongo();
  await Question.findByIdAndUpdate(id, { ...data.data });
  return NextResponse.json({ message: "Sub Topic updated" }, { status: 200 });
}

export async function DELETE(request: any, { params }: TopicsProps) {
  const { id } = params;
  await connectMongo();
  await Question.deleteOne({ _id: id });

  return NextResponse.json({ message: "Deleted" }, { status: 200 });
}

export async function GET(request: any, { params }: TopicsProps) {
  const { id } = params;
  await connectMongo();
  const questions = await Question.findOne({ _id: id });

  return NextResponse.json({ questions }, { status: 200 });
}
