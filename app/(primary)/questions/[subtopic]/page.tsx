import Questions from "@/components/Questions/Questions";

import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import {
  getSubTopicQuestion,
  getSubTopicDetails,
  getAllSubTopic
} from "@/app/utils/dataFetch";
import Comment from "@/components/Comment/Comment";

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

export async function generateMetadata(
  { params }: { params: { subtopic: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { subtopic } = params;
  try {
    const res = await getSubTopicDetails(subtopic);
    return {
      title: `${res.title}`,
      description: `${res.shortDescription}`,
      keywords: `${res.keywords}`,
      alternates: {
        canonical: `/questions/${res.slug}`
      }
    };
  } catch (error) {
    console.log({ error });

    return {
      title: "Not Found",
      description: "The page you are looking for does not exist."
    };
  }
}

const Question = async ({ params }: { params: { subtopic: string } }) => {
  const { subtopic } = params;
  let questions, subTopic;
  try {
    subTopic = await getSubTopicDetails(subtopic);
    questions = await getSubTopicQuestion(subTopic._id.toString());
  } catch (error) {
    notFound();
  }

  return (
    <>
      <Questions data={questions} topic={subTopic} />
      <Comment id={subTopic._id.toString()} />
    </>
  );
};

export default Question;
