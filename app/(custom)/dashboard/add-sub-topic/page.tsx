"use client"

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type SubTopic = {
  name: string;
  _id: string;
  topic: string;
};

const Page = () => {

  const [topic, setTopic] = useState("");
  const [topics, setTopics] = useState([{ name: "", _id: "" }]);
  const [subTopic, setSubTopic] = useState("");
  const [subTopics, setSubTopics] = useState<SubTopic[]>([]);

    const router = useRouter();

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

    const handleSubmit = async (e: any) => {
        e.preventDefault();
    
      
        try {
          const res = await fetch(`http://localhost:3000/api/topics/${topic}`, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({ name: subTopic, topic: topic }),
          });
    
          if (res.ok) {
            router.push("/dashboard");
          } else {
            throw new Error("Failed to create a topic");
          }
        } catch (error) {
          console.log(error);
        }
      };
  return (
    <>
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">

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

      <div>
        <div>
          <label
            htmlFor="small-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Sub Topic Name
          </label>
          <input
            onChange={e => setSubTopic(e.target.value)}
            value={subTopic}
            type="text"
            id="small-input"
            className="block w-1/2 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>

      <button className="relative inline-flex items-center justify-center p-0.5 mt-2 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          Save
        </span>
      </button>
      </form>
    </>
  );
};

export default Page;
