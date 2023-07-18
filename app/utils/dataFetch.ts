const APP_URI = process.env.APP_URI;
import connectMongo from "@/app/utils/connectMongo";
import SubTopics from "@/app/models/subTopics";
import Questions from "../models/questions";
import { json } from "stream/consumers";

export async function getSubTopicQuestion(subtopic:string) {
    await connectMongo();
    const questions = await Questions.find({subTopic: subtopic});
    // const res = JSON.stringify(questions);
    return questions;
}

export async function getSubTopicDetails(subtopic:string) {
    await connectMongo();
    const subTopics = await SubTopics.findOne({ _id: subtopic });
    // return JSON.stringify({subTopics});
    return subTopics;
}

export async function getAllSubTopic() {
    await connectMongo();
    const topics = await SubTopics.find();  
    // const res = JSON.stringify({topics});
    return topics;
}