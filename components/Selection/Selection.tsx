"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
const APP_URI = process.env.APP_URI;

import "./Selection.scss";

type SubTopic = {
  slug: string;
  name: string;
  _id: string;
  topic: string;
};

const Selection = () => {
  const [topic, setTopic] = useState("");
  const [topics, setTopics] = useState([{ name: "", _id: "" }]);
  const [subTopics, setSubTopics] = useState<SubTopic[]>([]);

  useEffect(() => {
    async function getTopics() {
      const data = await fetch(`${APP_URI}/api/topics`);
      const res = await data.json();
      setTopics(res);
    }

    async function getAllSubTopics() {
      const data = await fetch(`${APP_URI}/api/subtopics`);

      const res = await data.json();

      setSubTopics(res.topics);
    }
    getTopics();
    getAllSubTopics();
  }, []);

  return (
    <>
      <div className="q_a_section">
        <h1>SELECT TOPIC</h1>
        <p>Select a topic to get prepared for your next interview.</p>
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
            <li
              className={`item ${topic === "" ? "active" : ""}`}
              onClick={() => setTopic("")}
              key="all"
            >
              All
            </li>
          </ul>
        </div>

        <div className="item__details">
          <ul className="item_list">
            {subTopics.map((item) =>
              topic === "" || topic === item.topic ? (
                <Link href={`/questions/${item.slug}`} key={item._id}>
                  <li key={item._id}>{item.name}</li>
                </Link>
              ) : null
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Selection;
