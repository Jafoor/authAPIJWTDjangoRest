import connectMongo from "@/app/utils/connectMongo";
import Resources from "@/app/models/resourcePost";
import { NextResponse } from "next/server";

type FilterParams = {
  type: string;
};

type FilterProps = {
  params: FilterParams;
};

export async function GET(request: any, { params }: FilterProps) {
  const { type } = params;
  await connectMongo();

  if (type === "home-topics") {
    const resources = await Resources.find({ topOthers: true }).limit(2);
    return new Response(JSON.stringify(resources), { status: 200 });
  }

  if (type === "all-admin") {
    const resources = await Resources.find(
      {},
      { categoryName: 1, title: 1, createdAt: 1, isPublished: 1 }
    ).sort({ createdAt: -1 });
    return new Response(JSON.stringify(resources), { status: 200 });
  }

  if (type === "all-user") {
    const resources = await Resources.find(
      { isPublished: true },
      { description: 0 }
    ).sort({ createdAt: -1 });
    return new Response(JSON.stringify(resources), { status: 200 });
  }
  const resources = await Resources.find();
  return new Response(JSON.stringify(resources), { status: 200 });
}
