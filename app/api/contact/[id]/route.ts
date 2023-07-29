import connectMongo from "@/app/utils/connectMongo";
import Contact from "@/app/models/contact";
import { NextResponse } from "next/server";

type ContactParams = {
  id: string;
};

type ContactProps = {
  params: ContactParams;
};

export async function DELETE(request: any, { params }: ContactProps) {
  const { id } = params;
  await connectMongo();
  await Contact.deleteOne({ _id: id });

  return NextResponse.json({ message: "Deleted" }, { status: 200 });
}
