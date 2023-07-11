import React, { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { AiFillCheckCircle } from "react-icons/ai";

import "./Qustions.scss";

const Qustions = () => {

    const [showAnswerId, setShowAnswerId] = useState("");

    const toggleId = (id: string) => {
        if(showAnswerId === id){
            setShowAnswerId("");
        }else{
            setShowAnswerId(id);
        }
    }

  const data = {
    id: "akdsljfa8dsfiuhe",
    data: [
      {
        id:"1",
        question: "Name1 some characstics of python?",
        level: "easy",
        answer:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti quam dolore laboriosam quis maiores laudantium eos repellendus ea. Nisi enim cumque libero placeat ipsum soluta, dicta natus non rem ab! Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit saepe non, possimus nisi fuga debitis sed, sequi odit inventore accusantium reprehenderit quo nostrum ea. Aliquid, ab. Sed, aspernatur. Voluptate, impedit",
      },
      {
        id:"2",
        question: "Name2 some characstics of python?",
        level: "easy",
        answer:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti quam dolore laboriosam quis maiores laudantium eos repellendus ea. Nisi enim cumque libero placeat ipsum soluta, dicta natus non rem ab! Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit saepe non, possimus nisi fuga debitis sed, sequi odit inventore accusantium reprehenderit quo nostrum ea. Aliquid, ab. Sed, aspernatur. Voluptate, impedit",
      },
      {
        id:"3",
        question: "Name3 some characstics of python?",
        level: "easy",
        answer:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti quam dolore laboriosam quis maiores laudantium eos repellendus ea. Nisi enim cumque libero placeat ipsum soluta, dicta natus non rem ab! Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit saepe non, possimus nisi fuga debitis sed, sequi odit inventore accusantium reprehenderit quo nostrum ea. Aliquid, ab. Sed, aspernatur. Voluptate, impedit",
      },
    ],
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

      { data?.data.map((item, index) => (
        <div key={item.id}>
            <div className="questions__answers">
        <div className="question__content" onClick={() => toggleId(item.id)}>
          <span className="questionNumber">{index+1}. </span>
          <h2>{item.question}</h2>
        </div>

        <div className="QuestionAttributes">
          <div className="btnStatus">{item.level}</div>
          <AiFillCheckCircle className="checkMark done" />
        </div>
      </div>

      <div className={`answer ${showAnswerId === item.id ? "show" : ""}`}>
        <p>
          {item.answer}
        </p>
      </div>
        </div>
      ))}
    </div>
  );
};

export default Qustions;
