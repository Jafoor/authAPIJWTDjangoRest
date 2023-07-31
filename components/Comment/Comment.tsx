"use client";

import React, { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
const APP_URI = process.env.APP_URI;

type CommentType = {
  _id: string;
  image: string;
  content: string;
  user: string;
  email: string;
  createdAt: string;
};

const Comment = ({ id }: { id: string }) => {
  const { data: session } = useSession();
  const [content, setContent] = useState("");
  const [comments, setComments] = useState<CommentType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(`${APP_URI}/api/comment/${id}`);

      const data = await res.json();
      setComments(data);

    };
    getComments();
  }, []);
  const onPostComment = async (e: any) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await fetch(`${APP_URI}/api/comment/${id}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          image: session?.user?.image,
          user: session?.user?.name,
          email: session?.user?.email,
          content
        })
      });
      setContent("");
      setIsLoading(false);
      const res = await fetch(`${APP_URI}/api/comment/${id}`);
      const data = await res.json();
      setComments(data);
    } catch (err) {
      setIsLoading(false);
    }
  };
  return (
    <section className="mt-6 bg-white dark:bg-gray-900 max-w-screen-md m-auto py-8 lg:py-16">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Discussion ({comments.length})
          </h2>
        </div>
        <form className="mb-6">
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              id="comment"
              rows={parseInt("6")}
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
              placeholder="Write a comment..."
              required
            ></textarea>
          </div>
          {!session || !session.user ? (
            <>
              <Link
                href="#"
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-indigo-500 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                onClick={() => signIn()}
              >
                Get Started
              </Link>
              <span> to post comment.</span>
            </>
          ) : (
            <button
              disabled={isLoading || content === ""}
              onClick={onPostComment}
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-indigo-500 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              {isLoading && (
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 mr-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              )}
              Post comment
            </button>
          )}
        </form>
        <article className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
          {comments.map((item) => (
            <div key={item._id}>
              <footer
                className="flex justify-between items-center mb-2"
              >
                <div className="flex items-center">
                  <Image
                    className="mr-2 w-6 h-6 rounded-full"
                    src={item.image}
                    alt="Michael Gough"
                    height={50}
                    width={50}
                  />
                  <p
                    
                    className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white"
                  >
                    {item.user}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <time title="February 8th, 2022">
                      {item.createdAt &&
                        new Date(item.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        })}
                    </time>
                  </p>
                </div>
              </footer>
              <p className="text-gray-500 dark:text-gray-400">{item.content}</p>
            </div>
          ))}
        </article>
      </div>
    </section>
  );
};

export default Comment;
