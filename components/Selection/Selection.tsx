"use client"

import React , { useEffect, useState} from "react";
import Qustions from "../Questions/Qustions";
import "./Selection.scss";

const  Selection = () => {

  useEffect( () => {
    async function name() {
      const x = await fetch(`http://localhost:3000/api/topics`, {cache: 'no-store'});
      const res = await x.json();
      console.log({res});
      
      
    }
    name()
  }, [])

  const topics = [
    {
      id: "1",
      name: "Web & Mobile dev"
    },
    {
      id: "2",
      name: "Data Structures & Algorithms"
    },
    {
      id: "3",
      name: "Software Architecture"
    }
    
  ]

  const [topic, setTopic] = useState("");

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
          { topics.map(item => (
            <li className={`item ${topic === item.id ? 'active' : ''}`} onClick={() => setTopic(item.id)} key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>

      <div className="item__details">
        <ul className="item_list">
          <li className="item active">HTML</li>

          <li className="item">CSS</li>

          <li className="item">REACT</li>

          <li className="item">node</li>

          <li className="item">typescript</li>

          <li className="item">javascript</li>

          <li className="item">Nothing</li>
        </ul>
      </div>

      <Qustions/>
      </div>

    </div>
  );
};

export default Selection;