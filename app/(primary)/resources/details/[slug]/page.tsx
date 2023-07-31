import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { getResourceDetails } from "@/app/utils/resourceDataFetch";
import Image from "next/image";

import "suneditor/dist/css/suneditor.min.css";
import "./page.scss";
import Comment from "@/components/Comment/Comment";

const author = process.env.AUTHOR_IMAGE;

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = params;

  try {
    const res = await getResourceDetails(slug);
    return {
      title: `${res.title}`,
      description: `${res.shortDescription}`,
      keywords: `${res.keywords}`,
      alternates: {
        canonical: `/resources/details/${res.slug}`
      }
    };
  } catch (error) {
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist."
    };
  }
}

const page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  let post;
  try {
    post = await getResourceDetails(slug);
  } catch (error) {
    notFound();
  }
  return (
    <main className="mt-10">
      <div
        className="mb-4 md:mb-0 w-full max-w-screen-md mx-auto relative"
        style={{ height: "24em" }}
      >
        <div
          className="absolute left-0 bottom-0 w-full h-full z-10"
          style={{
            backgroundImage:
              "linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.7))"
          }}
        ></div>
        <Image
          src={post.image}
          alt={post.title}
          height={400}
          width={600}
          className="absolute left-0 top-0 w-full h-full z-0 object-cover"
        />
        <div className="p-4 absolute bottom-0 left-0 z-20">
          <a
            href="#"
            className="px-4 py-1 bg-black text-gray-200 inline-flex items-center justify-center mb-2"
          >
            {post.categoryName}
          </a>
          <h2 className="text-4xl font-semibold text-gray-100 leading-tight">
            {post.title}
          </h2>
          <div className="flex mt-3">
            {author && (
              <Image
                src={author}
                alt="Abu Jafor Mohammad Saleh"
                height={100}
                width={100}
                className="h-10 w-10 rounded-full mr-2 object-cover"
              />
            )}

            <div>
              <p className="font-semibold text-gray-200 text-sm">
                {" "}
                Abu Jafor Mohammad Saleh{" "}
              </p>
              <p className="font-semibold text-gray-400 text-xs">
                {" "}
                {post.createdAt &&
                  new Date(post.createdAt).toLocaleString()}{" "}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="suneditor px-4 lg:px-0 mt-2 text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.description }}
      ></div>
      <Comment id={post._id.toString()} />
    </main>
  );
};

export default page;
