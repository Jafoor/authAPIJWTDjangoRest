import React, { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { AiFillCheckCircle } from "react-icons/ai";
import "suneditor/dist/css/suneditor.min.css";
import Important from "../Important/Important";


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

type QuestionProps = {
  data: Question[];
};
const Questions = ({ data }: QuestionProps) => {
  return (
    <div className="questions">
      <div className="question__header">
        <h2>96 Python interview Questions</h2>
      </div>
      <span className="line" />

      {data?.map((item, index) => (
        <span key={item._id}>
          <div className="questions__answers">
            <div
              className="question__content"
            >
              <span className="questionNumber">{index + 1}. </span>
              <div className="text_editor" dangerouslySetInnerHTML={{ __html: item.question }}></div>
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
              <Important value={item.important} />
            </div>
          </div>

          <div className={`answer show`}>
          <div className="text_editor" dangerouslySetInnerHTML={{ __html: item.answer }}></div>
          </div>
        </span>
      ))}
    </div>
  );
};

export default Questions;
