import connectMongo from "@/app/utils/connectMongo";
import Topics from "@/app/models/topics";
import { NextResponse } from "next/server";

export async function POST(request: any) {
  const { name } = await request.json();
  await connectMongo();
  await Topics.create({ name });
  return NextResponse.json({ message: "Topic Created" }, { status: 201 });
}

export async function GET() {
  await connectMongo();
  const topics = await Topics.find();
  return new Response(JSON.stringify(topics), { status: 200 });
}

// export async function DELETE(request) {
//   const id = request.nextUrl.searchParams.get("id");
//   await connectMongo();
//   await Topic.findByIdAndDelete(id);
//   return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
// }
