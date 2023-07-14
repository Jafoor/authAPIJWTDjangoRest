"use client";

import React, { useEffect, useState } from "react";
import Questions from "../Questions/Questions";
import "./Selection.scss";

import { useSession } from "next-auth/react";

import Loader from "../Loader/Loader";


type SubTopic = {
  name: string;
  _id: string;
  topic: string;
};

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


const Selection = () => {
  const { data: session } = useSession();

  const [topic, setTopic] = useState("");
  const [topics, setTopics] = useState([{ name: "", _id: "" }]);
  const [subTopic, setSubTopic] = useState("");
  const [subTopics, setSubTopics] = useState<SubTopic[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    async function getTopics() {
      const data = await fetch(`http://localhost:3000/api/topics`, {
        cache: "no-store",
      });
      const res = await data.json();
      setTopics(res);
    }
    getTopics();
  }, []);
  
  useEffect( () => {
    async function getSubTopics() {
      const data = await fetch(`http://localhost:3000/api/topics/${topic}`, {
        cache: "no-store",
      });
      const res = await data.json();
      setSubTopics(res.topics)
    }
    if(topic){
      getSubTopics();
    }
  }, [topic])

  useEffect( () => {
    async function getSubTopics() {
      const data = await fetch(`http://localhost:3000/api/question/${topic}/${subTopic}`, {
        cache: "no-store",
      });
      const res = await data.json();
      
      setQuestions(res)
    }
    if(topic && subTopic){
      getSubTopics();
    }
  }, [topic, subTopic])
  

  return (
    <div className="question__answer">
      <div className="section_header">
        <div className="text">
          <h1>
            <span className="part1">The fastest way to prepare</span>
            <span className="part2"> for a tech interview </span>
          </h1>
          <p>
            Check our curated list of full-stack, data structures & software
            architecture interview questions and answers for developers
          </p>
        </div>

        <div className="browse__button">
          <button className="primaryBtn">Browse All the Questions</button>
        </div>
      </div>

      <div className="q_a_section">
        <div className="selection">
          <ul className="tabList">
            {topics.map((item) => (
              <li
                className={`item ${topic === item._id ? "active" : ""}`}
                onClick={() => setTopic(item._id)}
                key={item._id}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="item__details">
          <ul className="item_list">
            {subTopics.map(item => (
               <li className={`item ${subTopic === item._id ? "active" : ""}`} key={item._id} onClick={() => setSubTopic(item._id)} >{item.name}</li>
            ))}
            
          </ul>
        </div>

        <Questions 
          data={questions}
        />
      </div>
    </div>
  );
};

export default Selection;
