import React from 'react'
import { IoIosCloseCircle } from 'react-icons/io'
import { AiFillCheckCircle } from 'react-icons/ai';

import "./Qustions.scss";

const Qustions = () => {
  return (
    <div className='questions'>
        <div className='question__header'>
            <h2>96 Python interview Questions</h2>
            <IoIosCloseCircle className='closeBtn' />
        </div>
        <span className='line'/>
        <div className='progress'>
            <span>
                <span></span>
            </span>
            <p>Topic progress: 10%</p>
        </div>

        <div className='questions__answers'>
            <div className='question__content'>
                <span className='questionNumber'>1. </span>
                <h2>Name some characstics of python?</h2>
            </div>

            <div className='QuestionAttributes'>
                <div className='btnStatus'>Status</div>
                <AiFillCheckCircle className='checkMark done'/>
            </div>
 
 
        </div>
    </div>
  )
}

export default Qustions;