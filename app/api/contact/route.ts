import connectMongo from "@/app/utils/connectMongo";
import Contact from "@/app/models/contact";
import { NextResponse } from "next/server";

export async function POST(request: any) {
  const data = await request.json();

  await connectMongo();
  await Contact.create({ ...data.data });
  return NextResponse.json({ message: "Message sent" }, { status: 201 });
}

export async function GET() {
  await connectMongo();
  const contact = await Contact.find().sort({ createdAt: -1 });
  return new Response(JSON.stringify(contact), { status: 200 });
}
