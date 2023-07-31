import connectMongo from "@/app/utils/connectMongo";
import Blog from "@/app/models/blogPost";

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
    const resources = await Blog.find({ topOthers: true }).limit(2);
    return new Response(JSON.stringify(resources), { status: 200 });
  }

  if (type === "all-admin") {
    const resources = await Blog.find(
      {},
      { categoryName: 1, title: 1, createdAt: 1, isPublished: 1 }
    ).sort({ createdAt: -1 });
    return new Response(JSON.stringify(resources), { status: 200 });
  }

  if (type === "all-user") {
    const resources = await Blog.find(
      { isPublished: true },
      { description: 0 }
    ).sort({ createdAt: -1 });
    return new Response(JSON.stringify(resources), { status: 200 });
  }
  const resources = await Blog.find();
  return new Response(JSON.stringify(resources), { status: 200 });
}
