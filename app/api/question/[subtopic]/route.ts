import connectMongo from "@/app/utils/connectMongo";
import Questions from "@/app/models/questions";
import { NextResponse } from "next/server";

type QuestionParams = {
  subtopic: string;
};

type QuestionsProps = {
  params: QuestionParams;
};

export async function GET(request: any, { params }: QuestionsProps) {
  const { subtopic } = params;
  await connectMongo();
  const questions = await Questions.find({ subTopic: subtopic });
  return new Response(JSON.stringify(questions), { status: 200 });
}

// export async function DELETE(request) {
//   const id = request.nextUrl.searchParams.get("id");
//   await connectMongo();
//   await Topic.findByIdAndDelete(id);
//   return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
// }
