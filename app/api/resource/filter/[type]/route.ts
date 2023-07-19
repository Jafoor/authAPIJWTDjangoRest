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

    if(type === "home-topics"){
        const resources = await Resources.find({topOthers: true}).limit(2);
        return new Response(JSON.stringify(resources), {status: 200})
    }
    const resources = await Resources.find();
    return new Response(JSON.stringify(resources), {status: 200})
}