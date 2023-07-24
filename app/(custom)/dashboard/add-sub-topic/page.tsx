"use client"

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const APP_URI = process.env.APP_URI;

type SubTopic = {
  name: string;
  _id: string;
  topic: string;
};

const Page = () => {

  const [topic, setTopic] = useState("");
  const [topics, setTopics] = useState([{ name: "", _id: "" }]);
  const [subTopic, setSubTopic] = useState("");
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [topDescription, setTopDescription ] = useState("");
  const [keywords, setKeywords] = useState("");
  const [image, setImage] = useState("");

    const router = useRouter();

    useEffect(() => {
      async function getTopics() {
        const data = await fetch(`${APP_URI}/api/topics`);
        const res = await data.json();
        setTopics(res);
      }
      getTopics();
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
          const res = await fetch(`${APP_URI}/api/topics/${topic}`, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({ name: subTopic, topic, title, shortDescription, topDescription, keywords }),
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

    <div className="mb-4">
        <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Category</label>
        <select id="category" name="category" value={topic} onChange={(e) => setTopic(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <option value="">Select a Topic</option>
          { topics.map( (item) => (
            <option key={item._id} value={item._id}>{item.name}</option>
          ))}
        </select>
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
            required
            onChange={e => setSubTopic(e.target.value)}
            value={subTopic}
            type="text"
            id="small-input"
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <div>
          <label
            htmlFor="small-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            onChange={e => setTitle(e.target.value)}
            value={title}
            type="text"
            id="small-input"
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <div>
          <label
            htmlFor="small-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Short Description
          </label>
          <input
            onChange={e => setShortDescription(e.target.value)}
            value={shortDescription}
            type="text"
            id="small-input"
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <div>
          <label
            htmlFor="small-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Top Description
          </label>
          <input
            onChange={e => setTopDescription(e.target.value)}
            value={topDescription}
            type="text"
            id="small-input"
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <div>
          <label
            htmlFor="small-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            KeyWord
          </label>
          <input
            onChange={e => setKeywords(e.target.value)}
            value={keywords}
            type="text"
            id="small-input"
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <div>
          <label
            htmlFor="small-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Image
          </label>
          <input
            onChange={e => setImage(e.target.value)}
            value={image}
            type="text"
            id="small-input"
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>

      <button disabled= {subTopic === "" || topic === ""} className="relative inline-flex items-center justify-center p-4 mt-2 mb-2 mr-2 overflow-hidden cursor-pointer bg-red-700 text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br ">
        
          Save
      </button>
      </form>
    </>
  );
};

export default Page;
