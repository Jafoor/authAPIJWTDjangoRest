"use client";

import React, { useEffect, useState } from "react";
import Questions from "../Questions/Questions";
import "./Selection.scss";
import Header from "../Header/Header";
import { useSession } from "next-auth/react";

import Loader from "../Loader/Loader";
import Link from "next/link";
const APP_URI = process.env.APP_URI;

type SubTopic = {
  name: string;
  _id: string;
  topic: string;
};

const Selection = () => {
  const { data: session } = useSession();

  const [topic, setTopic] = useState("");
  const [topics, setTopics] = useState([{ name: "", _id: "" }]);
  const [subTopic, setSubTopic] = useState("");
  const [subTopics, setSubTopics] = useState<SubTopic[]>([]);

  useEffect(() => {
    async function getTopics() {
      const data = await fetch(`${APP_URI}/api/topics`, {
        cache: "no-store",
      });
      const res = await data.json();
      setTopics(res);
    }

    async function getAllSubTopics() {
      const data = await fetch(`${APP_URI}/api/subtopics`, {
        cache: "no-store",
      });

      const res = await data.json();

      setSubTopics(res.topics);
    }
    getTopics();
    getAllSubTopics();
  }, []);

  return (
    <>
      <div className="question__answer">
        <Header />
        {/* <div className="section_header">
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
      </div> */}
      </div>

      <div className="q_a_section">
        <h1>SELECT TOPIC</h1>
        <p>Select a topic to get prepered for your next interview.</p>
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
                <Link
                  href={`/questions/${subTopic}`}
                  target="_blank"
                  key={item._id}
                >
                  <li
                    className={`item ${subTopic === item._id ? "active" : ""}`}
                    key={item._id}
                    onClick={() => setSubTopic(item._id)}
                  >
                    {item.name}
                  </li>
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
