import connectMongo from "@/app/utils/connectMongo";
import Questions from "@/app/models/questions";
import { NextResponse } from "next/server";

export async function POST(request: any) {
  const { user, question, answer, level, important, isPublished, topic, subTopic } = await request.json();
  await connectMongo();
  await Questions.create({ user, question, answer, level, important, isPublished, topic, subTopic });
  return NextResponse.json({ message: "Question Created" }, { status: 201 });
}