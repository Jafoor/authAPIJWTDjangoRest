"use client"

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import "@/components/Selection/Selection.scss";
import { useSession } from "next-auth/react";

import SunTextEditor from "@/components/SunEditor/Suneditor";
import "./page.scss";

const APP_URI = process.env.APP_URI;

type SubTopic = {
  name: string;
  _id: string;
  topic: string;
};

const Page = () => {

  const {data: session} = useSession();

  const [topic, setTopic] = useState("");
  const [topics, setTopics] = useState([{ name: "", _id: "" }]);
  const [subTopic, setSubTopic] = useState("");
  const [subTopics, setSubTopics] = useState<SubTopic[]>([]);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [level, setLevel] = useState(1);
  const [important, setImportant] = useState(3);
  const [isPublished, setIsPublished] = useState(false);


    const router = useRouter();

    useEffect(() => {
      async function getTopics() {
        const data = await fetch(`${APP_URI}/api/topics`);
        const res = await data.json();
        setTopics(res);
      }
      getTopics();
    }, []);

    useEffect( () => {
        async function getSubTopics() {
          const data = await fetch(`${APP_URI}/api/topics/${topic}`);
          const res = await data.json();
          setSubTopics(res.topics)
        }
        if(topic){
          getSubTopics();
        }
      }, [topic])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
    
      
        try {
            if(topic && subTopic && question && answer && level && important && isPublished && session){
                const res = await fetch(`${APP_URI}/api/question`, {
                    method: "POST",
                    headers: {
                      "Content-type": "application/json",
                    },
                    body: JSON.stringify({ topic, subTopic, question, answer, level, important, isPublished, user: session.user?.email }),
                  });
            
                  if (res.ok) {
                    router.push("/dashboard");
                  } else {
                    throw new Error("Failed to create a topic");
                  }
            }
          
        } catch (error) {
          console.log(error);
        }
      };
  return (
    <>
    <form onSubmit={handleSubmit} className="w-full m-auto flex flex-col gap-3">

    <div className="topics_selection">
        {/* <div className="selection">
            <h1>Select Topics</h1>
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
        </div> */}

        <div className="mb-4">
        <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Category</label>
        <select id="category" name="category" value={topic} onChange={(e) => setTopic(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <option value="">Select a Topic</option>
          { topics.map( (item) => (
            <option key={item._id} value={item._id}>{item.name}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Sub Category</label>
        <select id="category" name="category" value={subTopic} onChange={(e) => setSubTopic(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <option value="">Select a Sub Topic</option>
          { subTopics.map( (item) => (
            <option key={item._id} value={item._id}>{item.name}</option>
          ))}
        </select>
      </div>



        {/* <div className="item__details">
          <ul className="item_list">
            
            {subTopics.map(item => (
               <li className={`item ${subTopic === item._id ? "active" : ""}`} key={item._id} onClick={() => setSubTopic(item._id)} >{item.name}</li>
            ))}
            
          </ul>
        </div> */}

      </div>

      
        <div className="w-full m-auto">
          <label
            htmlFor="small-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Question
          </label>
          <SunTextEditor
          setOptionsType="main-admin"
          defaultValue={
            question
          }
          height="200px"
          placeholder="Question..."
          onValueChange={(val) =>
            setQuestion(val)
          }
          />
        </div>

        <div className="w-full m-auto">
          <label
            htmlFor="small-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Answer
          </label>

          <SunTextEditor
          setOptionsType="main-admin"
          defaultValue={
            answer
          }
          height="400px"
          placeholder="Question..."
          onValueChange={(val) =>
            setAnswer(val)
          }
          />
        </div>

        <div>
          <label
            htmlFor="small-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Level
          </label>
          <input
            onChange={e => setLevel(parseInt(e.target.value))}
            value={level}
            type="number"
            id="small-input"
            className="block w-1/2 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="small-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Important
          </label>
          <input
            onChange={e => setImportant(parseInt(e.target.value))}
            value={important}
            type="number"
            id="small-input"
            className="block w-1/2 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <label className="gap-3">
        <input
          type="checkbox"
          checked={isPublished}
          onChange={() => setIsPublished(!isPublished)}
        />
        Publish
      </label>



    

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
