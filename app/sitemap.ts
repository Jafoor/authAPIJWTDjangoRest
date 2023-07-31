import { getAllSubTopic } from "./utils/dataFetch";
import { getAllResource } from "./utils/resourceDataFetch";
import { getAllBlog } from "./utils/blogDataFetch";

export default async function sitemap() {
  const baseUrl = "https://nextjs13-seo.vercel.app";

  // Get All Posts from CMS
  const subTopics = await getAllSubTopic();
  const subTopicsQuestions =
    subTopics?.map((item: any) => {
      return {
        url: `${baseUrl}/questions/${item.slug}`,
        lastModified: new Date()
      };
    }) ?? [];
  
  const resources = await getAllResource()
  const allResources =
  resources?.map((item: any) => {
      return {
        url: `${baseUrl}/resources/details/${item.slug}`,
        lastModified: new Date()
      };
    }) ?? [];

    const blogs = await getAllResource()
    const allBlogs =
    blogs?.map((item: any) => {
        return {
          url: `${baseUrl}/blogs/details/${item.slug}`,
          lastModified: new Date()
        };
      }) ?? [];

  return [
    {
      url: baseUrl,
      lastModified: new Date()
    },
    ...subTopicsQuestions,
    ...allResources,
    ...allBlogs
  ];
}
