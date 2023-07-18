import Questions from "@/components/Questions/Questions";

import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { getSubTopicQuestion, getSubTopicDetails, getAllSubTopic } from "@/app/utils/dataFetch";
const APP_URI = process.env.APP_URI;

type Question = {
  _id: string;
  topic: string;
  subTopic: string;
  question: string;
  answer: string;
  level: number;
  important: number;
  isPublished: boolean;
  user: string;
};

type SubTopic = {
  _id: string;
  topic: string;
  name: string;
};

export async function generateMetadata(
  { params }: { params: { subtopic: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { subtopic } = params;

  try {
    const res = await getSubTopicDetails(subtopic);
    return {
      title: `${res.subTopics.name} Interview Questions`,
      description: `Discover a comprehensive collection of ${res.subTopics.name} interview questions, ranging from easy to hard difficulty levels. This curated compilation includes answers to help you prepare for your next ${res.subTopics.name} job interview. Expand your knowledge and gain confidence in tackling various aspects of ${res.subTopics.name} development with this valuable resource`,
      alternates: {
        canonical: `/questions/${res.subTopics._id}`,
      },
    };
  } catch (error) {
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist.",
    };
  }
}

export async function generateStaticParams() {
  const subTopics = await getAllSubTopic();

  if (!subTopics) return [];

  return subTopics.map((item: any) => ({
    params: {subtopic : item._id.toString()}
  }));
}

const Question = async ({ params }: { params: { subtopic: string } }) => {
  const { subtopic } = params;
  let questions, subTopic;
  try{

    questions = await getSubTopicQuestion(subtopic);

    subTopic = await getSubTopicDetails(subtopic);
    }catch(error){
    notFound();
  }

  return (
    <>
      <Questions data={questions} topic={subTopic.name} />
    </>
  );
};

export default Question;
