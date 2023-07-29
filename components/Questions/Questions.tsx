import React from "react";
// import { IoIosCloseCircle } from "react-icons/io";
// import { AiFillCheckCircle } from "react-icons/ai";
import "suneditor/dist/css/suneditor.min.css";
// import Important from "../Important/Important";
import Head from "next/head";
import Image from "next/image";

import "./Questions.scss";

type Question = {
  _id: string;
  topic: string;
  subTopic: string;
  question: string;
  answer: string;
  level: number;
  important: number;
  user: string;
};

type SubTopic = {
  _id: string;
  topic: string;
  title?: string;
  topDescription?: string;
  keywords?: string;
  image?: string;
  shortDescription?: string;
  name: string;
};

type QuestionProps = {
  data: Question[];
  topic: SubTopic;
};
const Questions = ({ data, topic }: QuestionProps) => {
  return (
    <>
      <Head>
        {topic.title ? (
          <title>{topic.title}</title>
        ) : (
          <title>{`${data.length} ${topic.name} Interview Questions`}</title>
        )}

        <meta
          property="og:title"
          content={
            topic.title
              ? topic.title
              : `${data.length} ${topic.name} Interview Questions`
          }
          key="title"
        />
      </Head>
      <div className="questions">
        <div className="question__header">
          {topic?.image && (
            <Image
              src={topic?.image}
              alt="Header image"
              height={400}
              width={600}
            />
          )}

          <h1>
            {topic.title
              ? topic.title
              : `${data.length} ${topic.name} interview Questions`}
          </h1>

          <p>{topic?.topDescription}</p>
        </div>
        <span className="line" />

        {data?.map((item, index) => (
          <span key={item._id}>
            <div className="questions__answers">
              <div className="question__content">
                <span className="questionNumber">{index + 1}. </span>
                <div
                  className="text_editor"
                  dangerouslySetInnerHTML={{ __html: item.question }}
                ></div>
              </div>

              <div className="QuestionAttributes">
                <div className="btnStatus">
                  {(() => {
                    switch (item.level) {
                      case 1:
                        return "Basic";
                      case 2:
                        return "Moderate";
                      case 3:
                        return "Advance";
                      default:
                        return "";
                    }
                  })()}
                </div>
              </div>
            </div>

            <div className={`answer show`}>
              <div
                className="text_editor"
                dangerouslySetInnerHTML={{ __html: item.answer }}
              ></div>
            </div>
          </span>
        ))}
      </div>
    </>
  );
};

export default Questions;
