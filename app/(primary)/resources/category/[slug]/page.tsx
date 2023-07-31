import React from "react";
import {
  getCategoryDetails,
  getResourcesByCategory
} from "@/app/utils/resourceDataFetch";
import { notFound } from "next/navigation";
import Link from "next/link";
const page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  let category;
  let posts;
  try {
    category = await getCategoryDetails(slug);
    if (category === null || category === undefined) {
      throw "not found";
    }
    posts = await getResourcesByCategory(category._id);
    if (posts === null || posts === undefined) {
      throw "not found";
    }
  } catch (err) {
    notFound();
  }
  return (
    <section className="text-gray-600 body-font overflow-hidden max-w-screen-lg m-auto">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            {category.name}
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            {category.description}
          </p>
        </div>

        <div className="-my-8 divide-y-2 divide-gray-100">
          {posts.map((item) => (
            <div key={item._id} className="py-8 flex flex-wrap md:flex-nowrap">
              <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                <span className="font-semibold title-font text-gray-700">
                  {item.tag}
                </span>
                <span className="mt-1 text-gray-500 text-sm">
                  {item.createdAt &&
                    new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="md:flex-grow">
                <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
                  {item.title}
                </h2>
                <p className="leading-relaxed">
                  {item.shortDescription.slice(0, 160)}
                </p>
                <Link
                  href={`/resources/details/${item.slug}`}
                  className="text-indigo-500 inline-flex items-center mt-4"
                >
                  Learn More
                  <svg
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default page;
