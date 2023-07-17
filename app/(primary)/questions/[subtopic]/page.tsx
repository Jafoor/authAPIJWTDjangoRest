"use client"

import React, {useState, useEffect} from 'react'
import Questions from '@/components/Questions/Questions';

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
  user: string
};

const Question = ({ params }: { params: { subtopic: string } }) => {
  const { subtopic } = params;
  const [questions, setQuestions] = useState<Question[]>([]);
  useEffect( () => {
    async function getAllQuestions() {
      const data = await fetch(`${APP_URI}/api/question/${subtopic}`, {
        cache: "no-store",
      });
      const res = await data.json();
      
      setQuestions(res)
    }
    if(subtopic){
      getAllQuestions();
    }
  }, [subtopic])
    console.log({params});
    
  return (
    <Questions data={questions}/>
  )
}

export default Question