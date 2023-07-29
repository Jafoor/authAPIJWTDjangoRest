"use client";

import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";
const APP_URI = process.env.APP_URI;

type Question = {
  _id: string;
  question: string;
  isPublished?: string;
  createdAt?: string;
};

type SubTopic = {
  _id: string;
  title?: string;
  name?: string;
  topDescription?: string;
  shortDescription?: string;
  keywords?: string;
  image?: string;
  createdAt?: string;
  topic?: string;
};

const Page = () => {
  const [subtopics, setSubtopics] = useState<SubTopic[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [subTopic, setSubTopic] = useState("");
  const route = useRouter();

  useEffect(() => {
    async function getSubTopics() {
      try {
        const data = await fetch(`${APP_URI}/api/subtopics`);
        const res = await data.json();
        setSubtopics(res.topics);
      } catch (error) {
        console.log(error);
      }
    }
    getSubTopics();
  }, []);

  useEffect(() => {
    async function getQuestions() {
      try {
        const data = await fetch(
          `${APP_URI}/api/question/${subTopic}/admin-all`
        );
        const res = await data.json();
        setQuestions(res);
      } catch (error) {
        console.log(error);
      }
    }
    if (subTopic !== "") {
      getQuestions();
    }
  }, [subTopic]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="mb-4">
        <label
          htmlFor="category"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Category
        </label>
        <select
          id="category"
          name="category"
          value={subTopic}
          onChange={(e) => setSubTopic(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select a Sub Topic</option>
          {subtopics.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Question
            </th>
            <th scope="col" className="px-6 py-3">
              Time
            </th>
            <th scope="col" className="px-6 py-3">
              Published
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {questions.map((item) => (
            <tr
              key={item._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <Link href={`/dashboard/questions-list/edit/${item._id}`}>
                <th
                  scope="row"
                  dangerouslySetInnerHTML={{ __html: item.question }}
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                ></th>
              </Link>

              <td className="px-6 py-4">
                {item.createdAt && new Date(item.createdAt).toLocaleString()}
              </td>
              <td className="px-6 py-4">{item.isPublished ? "Yes" : "No"}</td>
              <td className="px-6 py-4 text-right">
                {/* <ShowModal
                     deleteBtn={() => handleDelete(item._id)}
                     data={item}
                    /> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
