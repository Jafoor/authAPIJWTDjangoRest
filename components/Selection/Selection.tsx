"use client";

import React, { useEffect, useState } from "react";
import Questions from "../Questions/Questions";
import "./Selection.scss";

import { useSession } from "next-auth/react";


type SubTopic = {
  name: string;
  _id: string;
  topic: string;
};


const Selection = () => {
  const { data: session } = useSession();

  

  const [showModal, setShowModal] = useState(false);
  const [topic, setTopic] = useState("");
  const [topics, setTopics] = useState([{ name: "", _id: "" }]);
  const [subTopic, setSubTopic] = useState("");
  const [subTopics, setSubTopics] = useState<SubTopic[]>([]);

  console.log(topic);

  useEffect(() => {
    async function getTopics() {
      const data = await fetch(`http://localhost:3000/api/topics`, {
        cache: "no-store",
      });
      const res = await data.json();
      console.log(res);
      
      setTopics(res);
    }
    getTopics();
  }, []);

  console.log(subTopics);
  

  useEffect( () => {
    async function getSubTopics() {
      const data = await fetch(`http://localhost:3000/api/topics/${topic}`, {
        cache: "no-store",
      });
      const res = await data.json();
      console.log(res);
      
      setSubTopics(res)
    }
    if(topic){
      getSubTopics();
    }
  }, [topic])


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
            
            {subTopics.length > 0 ?? subTopics.map(item => (
               <li className={`item ${subTopic === item._id ? "active" : ""}`} key={item._id} onClick={() => setSubTopic(item._id)} >{item.name}</li>
            ))}
            
          </ul>
        </div>

        <Questions />
      </div>
    </div>
  );
};

export default Selection;
