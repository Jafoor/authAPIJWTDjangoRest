import connectMongo from "@/app/utils/connectMongo";
import Questions from "@/app/models/questions";
import { NextResponse } from "next/server";

type QuestionParams = {
    subtopic: string;
    type: string;
  };
  
  type QuestionsProps = {
    params: QuestionParams;
  };

export async function GET(request: any, { params }: QuestionsProps) {
  const { subtopic, type } = params;
  
  await connectMongo();
  if(type === "admin-all"){
    const questions = await Questions.find({subTopic: subtopic}, {question: 1, isPublished: 1, createdAt: 1}).sort({ createdAt: -1 });
  return new Response(JSON.stringify(questions), {status: 200});
  }
  const questions = await Questions.find({subTopic: subtopic});
  return new Response(JSON.stringify(questions), {status: 200})
}

// export async function DELETE(request) {
//   const id = request.nextUrl.searchParams.get("id");
//   await connectMongo();
//   await Topic.findByIdAndDelete(id);
//   return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
// }