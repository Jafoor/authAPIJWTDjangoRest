import connectMongo from "@/app/utils/connectMongo";
import Comment from "@/app/models/comment";
import { NextResponse } from "next/server";

type CommentParams = {
  id: string;
};

type CommentProps = {
  params: CommentParams;
};

export async function POST(request: any,  { params }: CommentProps) {
    const { id } = params;
    const data = await request.json();
    await connectMongo();
    await Comment.create({ post:id, ...data });
    return NextResponse.json({ message: "Message sent" }, { status: 201 });
  }

  export async function GET(request: any,  { params }: CommentProps) {
    const { id } = params;
    await connectMongo();
    const comment = await Comment.find({post: id}).sort({ createdAt: -1 });
    return new Response(JSON.stringify(comment), { status: 200 });
  }

export async function DELETE(request: any, { params }: CommentProps) {
  const { id } = params;
  await connectMongo();
  await Comment.deleteOne({ _id: id });

  return NextResponse.json({ message: "Deleted" }, { status: 200 });
}
