import React from 'react';
import './Question.css';

const Question = (props) => (
  <div className= "Question-container">
    <div className = "term">
      {props.term}
    </div>    
  </div>
)

export default Question;
