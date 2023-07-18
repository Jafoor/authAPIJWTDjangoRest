import { getAllSubTopic } from "./utils/dataFetch";
const APP_URI = process.env.APP_URI;

export default async function sitemap() {
  const baseUrl = "https://nextjs13-seo.vercel.app";

  // Get All Posts from CMS
  const subTopics = await getAllSubTopic();
  const subTopicsQuestions =
  subTopics?.map((item: any) => {
      return {
        url: `${baseUrl}/questions/${item._id}`,
        lastModified: new Date(),
      };
    }) ?? [];


  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...subTopicsQuestions,
  ];
}