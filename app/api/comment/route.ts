import connectMongo from "@/app/utils/connectMongo";
import Comments from "@/app/models/comment";


export async function GET() {
  await connectMongo();
  const comment = await Comments.find().sort({ createdAt: -1 });
  return new Response(JSON.stringify(comment), { status: 200 });
}
