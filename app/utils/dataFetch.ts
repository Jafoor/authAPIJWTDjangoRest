const APP_URI = process.env.APP_URI;
import connectMongo from "@/app/utils/connectMongo";
import SubTopics from "@/app/models/subTopics";
import Questions from "../models/questions";

export async function getSubTopicQuestion(subtopic: string) {
  await connectMongo();
  const questions = await Questions.find({ subTopic: subtopic });
  
  return questions;
}

export async function getSubTopicDetails(subtopic: string) {
  await connectMongo();  
  const subTopics = await SubTopics.findOne({ slug: subtopic });
  
  return subTopics;
}

export async function getAllSubTopic() {
  await connectMongo();
  const topics = await SubTopics.find();
  return topics;
}
