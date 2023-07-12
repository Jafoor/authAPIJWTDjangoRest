"use client"

import React , { useEffect, useState} from "react";
import Qustions from "../Questions/Qustions";
import "./Selection.scss";

import { useSession } from "next-auth/react";

const  Selection = () => {

  const { data: session } = useSession();

  const [showModal, setShowModal] = useState(false);

  useEffect( () => {
    async function name() {
      const x = await fetch(`http://localhost:3000/api/topics`, {cache: 'no-store'});
      const res = await x.json();
    }
    name()
  }, [])

  const topics = [
    {
      id: "1",
      name: "Web & Mobile dev"
    },
    {
      id: "2",
      name: "Data Structures & Algorithms"
    },
    {
      id: "3",
      name: "Software Architecture"
    }
    
  ]

  const [topic, setTopic] = useState("");

  return (
    <div className="question__answer">
      <div className="section_header">
        <div className="text">
          <h1>
            <span className="part1">The fastest way to prepare</span>
            <span className="part2"> for a tech interview </span>
          </h1>
          <p>
            Check our curated list of full-stack, data structures & software
            architecture interview questions and answers for developers
          </p>
        </div>

        <div className="browse__button">
            <button className="primaryBtn">Browse All the Questions</button>
        </div>
      </div>

    <div className="q_a_section">
      <div className="selection">
        <ul className="tabList">
          { topics.map(item => (
            <li className={`item ${topic === item.id ? 'active' : ''}`} onClick={() => setTopic(item.id)} key={item.id}>{item.name}</li>
          ))}
           {session?.user?.isAdmin ? (
      <li
        className="item"

        onClick={() => setShowModal(true)}
      >
        Add Another
      </li>) : null}
        </ul>
      </div>

      <>

     
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">General Info</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                    <label className="block text-black text-sm font-bold mb-1">
                      First Name
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                    <label className="block text-black text-sm font-bold mb-1">
                      Last Name
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                    <label className="block text-black text-sm font-bold mb-1">
                      Address
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                    <label className="block text-black text-sm font-bold mb-1">
                      City
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>

      <div className="item__details">
        <ul className="item_list">
          <li className="item active">HTML</li>

          <li className="item">CSS</li>

          <li className="item">REACT</li>

          <li className="item">node</li>

          <li className="item">typescript</li>

          <li className="item">javascript</li>

          <li className="item">Nothing</li>
        </ul>
      </div>

      <Qustions/>
      </div>

    </div>
  );
};

export default Selection;