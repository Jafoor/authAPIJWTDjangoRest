import React, { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { AiFillCheckCircle } from "react-icons/ai";

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
  const [showAnswerId, setShowAnswerId] = useState("");

  const toggleId = (id: string) => {
    if (showAnswerId === id) {
      setShowAnswerId("");
    } else {
      setShowAnswerId(id);
    }
  };

  return (
    <div className="questions">
      <div className="question__header">
        <h2>96 Python interview Questions</h2>
        <IoIosCloseCircle className="closeBtn" />
      </div>
      <span className="line" />
      <div className="progress">
        <span>
          <span></span>
        </span>
        <p>Topic progress: 10%</p>
      </div>

      {data?.map((item, index) => (
        <div key={item._id}>
          <div className="questions__answers">
            <div
              className="question__content"
              onClick={() => toggleId(item._id)}
            >
              <span className="questionNumber">{index + 1}. </span>
              <h2>{item.question}</h2>
            </div>

            <div className="QuestionAttributes">
              <div className="btnStatus">
                {(() => {
                  switch (item.level) {
                    case 1:
                      return "Easy";
                    case 2:
                      return "Intermediate";
                    case 3:
                      return "Hard";
                    default:
                      return "";
                  }
                })()}
              </div>
              {<AiFillCheckCircle className="checkMark done" />}
            </div>
          </div>

          <div className={`answer ${showAnswerId === item._id ? "show" : ""}`}>
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Questions;
