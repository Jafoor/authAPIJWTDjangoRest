"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import SunTextEditor from "@/components/SunEditor/Suneditor";

const APP_URI = process.env.APP_URI;

type SubTopic = {
  _id: string;
  title?: string;
  slug?: string;
  name?: string;
  topDescription?: string;
  shortDescription?: string;
  keywords?: string;
  image?: string;
  createdAt?: string;
  topic?: string;
};

const FormComponent = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const { data: session } = useSession();
  const router = useRouter();

  const [subtopics, setSubtopics] = useState<SubTopic[]>([]);
  const [formData, setFormData] = useState({
    user: "",
    slug: "",
    question: "",
    answer: "",
    level: "",
    important: "",
    isPublished: false,
    topic: "",
    subTopic: ""
  });

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

    async function getQuestion() {
      const data = await fetch(`${APP_URI}/api/question/find/${id}`);
      const resource = await data.json();
      const res = resource.questions;

      setFormData({
        ...formData,
        user: res.user || "",
        slug: res.slug || "",
        question: res.question || "",
        answer: res.answer || "",
        level: res.level || 0,
        important: res.important || 0,
        topic: res.topic || "",
        isPublished: res.isPublished || false,
        subTopic: res.subTopic || ""
      });
    }
    getQuestion();
  }, []);

  const onValueChangeEditor = (name: string, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: fieldValue
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      if (formData.subTopic && formData.question && formData.answer) {
        formData.user = session?.user?.email as string;
        const res = await fetch(`${APP_URI}/api/question/find/${id}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({ data: formData })
        });

        if (res.ok) {
          router.push("/dashboard");
        } else {
          throw new Error("Failed to Update resource");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="slug"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Slug
        </label>
        <input
          type="text"
          id="slug"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      {formData.question ? (
        <div className="mb-4">
          <label
            htmlFor="question"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Description
          </label>
          <SunTextEditor
            setOptionsType="main-admin"
            defaultValue={formData.question ? formData.question : ""}
            height="400px"
            placeholder="Resources..."
            onValueChange={(val) => onValueChangeEditor("question", val)}
          />
          {/* <textarea id="question" name="question" value={formData.question} onChange={handleChange} rows={4} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea> */}
        </div>
      ) : null}

      {formData.answer ? (
        <div className="mb-4">
          <label
            htmlFor="answer"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Description
          </label>
          <SunTextEditor
            setOptionsType="main-admin"
            defaultValue={formData.answer ? formData.answer : ""}
            height="400px"
            placeholder="Answer..."
            onValueChange={(val) => onValueChangeEditor("answer", val)}
          />
          {/* <textarea id="question" name="question" value={formData.question} onChange={handleChange} rows={4} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea> */}
        </div>
      ) : null}

      <div className="mb-4">
        <label
          htmlFor="important"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Important
        </label>
        <input
          type="number"
          id="important"
          name="important"
          value={formData.important}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="level"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Level
        </label>
        <input
          type="number"
          id="level"
          name="level"
          value={formData.level}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="isPublished"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Is Published
        </label>
        <input
          type="checkbox"
          id="isPublished"
          name="isPublished"
          checked={formData.isPublished}
          onChange={handleChange}
          className="mr-2 leading-tight"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="subTopic"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Category
        </label>
        <select
          id="subTopic"
          name="subTopic"
          value={formData.subTopic}
          onChange={handleChange}
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

      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default FormComponent;
