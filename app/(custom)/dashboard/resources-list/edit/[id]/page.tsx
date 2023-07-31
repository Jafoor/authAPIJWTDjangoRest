"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import SunTextEditor from "@/components/SunEditor/Suneditor";

const APP_URI = process.env.APP_URI;

type Category = {
  name: string;
  _id: string;
  topic: string;
};

const FormComponent = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const { data: session } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    user: "",
    slug: "",
    title: "",
    shortDescription: "",
    keywords: "",
    image: "",
    description: "",
    isPublished: false,
    topNews: false,
    topOthers: false,
    tag: "",
    popular: false,
    category: "",
    categoryName: ""
  });
  const [category, setCategory] = useState<Category[]>([]);

  useEffect(() => {
    async function getCategory() {
      const data = await fetch(`${APP_URI}/api/resource-category`);
      const res = await data.json();
      setCategory(res);
    }

    async function getResource() {
      const data = await fetch(`${APP_URI}/api/resource/${id}`);
      const resource = await data.json();
      const res = resource.resources;
      setFormData({
        ...formData,
        user: res.user || "",
        title: res.title || "",
        shortDescription: res.shortDescription || "",
        keywords: res.keywords || "",
        image: res.image || "",
        description: res.description || "",
        isPublished: res.isPublished || false,
        topNews: res.topNews || false,
        topOthers: res.topOthers || false,
        tag: res.tag || "",
        popular: res.popular || false,
        category: res.category || "",
        categoryName: res.categoryName || "",
        slug: res.slug || ""
      });
    }
    getResource();

    getCategory();
  }, []);

  //   useEffect(() => {

  //   }, [id]);

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
      if (formData.category && formData.title && formData.shortDescription) {
        formData.user = session?.user?.email as string;
        const res = await fetch(`${APP_URI}/api/resource/${id}`, {
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
          htmlFor="title"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

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

      <div className="mb-4">
        <label
          htmlFor="shortDescription"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Short Description
        </label>
        <input
          type="text"
          id="shortDescription"
          name="shortDescription"
          value={formData.shortDescription}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="keywords"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          keywords
        </label>
        <input
          type="text"
          id="keywords"
          name="keywords"
          value={formData.keywords}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="image"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Image
        </label>
        <input
          type="text"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      {formData.description ? (
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Description
          </label>
          <SunTextEditor
            setOptionsType="main-admin"
            defaultValue={formData.description ? formData.description : ""}
            height="400px"
            placeholder="Resources..."
            onValueChange={(val) => onValueChangeEditor("description", val)}
          />
          {/* <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={4} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea> */}
        </div>
      ) : null}

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
          htmlFor="topNews"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Top News
        </label>
        <input
          type="checkbox"
          id="topNews"
          name="topNews"
          checked={formData.topNews}
          onChange={handleChange}
          className="mr-2 leading-tight"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="topOthers"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Top Others
        </label>
        <input
          type="checkbox"
          id="topOthers"
          name="topOthers"
          checked={formData.topOthers}
          onChange={handleChange}
          className="mr-2 leading-tight"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="tag"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Tag
        </label>
        <input
          type="text"
          id="tag"
          name="tag"
          value={formData.tag}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="popular"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Popular
        </label>
        <input
          type="checkbox"
          id="popular"
          name="popular"
          checked={formData.popular}
          onChange={handleChange}
          className="mr-2 leading-tight"
        />
      </div>

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
          value={formData.category}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select a category</option>
          {category.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="categoryName"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Category Name
        </label>
        <input
          type="text"
          id="categoryName"
          name="categoryName"
          value={formData.categoryName}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
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
