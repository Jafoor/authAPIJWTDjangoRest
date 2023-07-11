import connectMongo from "@/app/utils/connectMongo";
import Topics from "@/app/models/interview_topics";
import { NextResponse } from "next/server";

// export async function POST(request) {
//   const { title, description } = await request.json();
//   await connectMongo();
//   await Topic.create({ title, description });
//   return NextResponse.json({ message: "Topic Created" }, { status: 201 });
// }

export async function GET() {
  console.log("herer");
  
  await connectMongo();
  console.log("here1");
  
  const topics = await Topics.find();
  console.log({topics});
  
  return new Response(JSON.stringify(topics), {status: 200})
}

// export async function DELETE(request) {
//   const id = request.nextUrl.searchParams.get("id");
//   await connectMongo();
//   await Topic.findByIdAndDelete(id);
//   return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
// }