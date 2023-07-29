import connectMongo from "@/app/utils/connectMongo";
import SubTopics from "@/app/models/subTopics";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongo();
  const topics = await SubTopics.find();
  return new Response(JSON.stringify({ topics }), { status: 200 });
}
