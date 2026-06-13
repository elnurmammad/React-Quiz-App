import React, { use, useRef, useState } from "react";
import { data } from "../data/data";

function Quiz() {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);

  let Answer1 = useRef(null);
  let Answer2 = useRef(null);
  let Answer3 = useRef(null);
  let Answer4 = useRef(null);

  let answersArray = [Answer1, Answer2, Answer3, Answer4];

  const answerCheck = (e, correct) => {
    if (lock === false) {
      if (question.correct === correct) {
        e.target.classList.add("correct");
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        answersArray[question.correct - 1].current.classList.add("correct");
      }
    }
  };

  const nextBtn = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        setResult(true);
        return 0;
      }

      setIndex(++index);
      setQuestion(data[index]);
      setLock(false);
      answersArray.map((answer) => {
        answer.current.classList.remove("wrong");
        answer.current.classList.remove("correct");
        return null;
      });
    }
  };

  const tryBtn = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setResult(false);
    setLock(false);
  };

  return (
    <div className="quiz-container">
      <h1>Quiz App</h1>
      <hr />
      {result ? (
        <></>
      ) : (
        <>
          <h2 className="question">
            {index + 1}.{question.question}
          </h2>
          <ul>
            <li
              ref={Answer1}
              onClick={(e) => {
                answerCheck(e, 1);
              }}
            >
              {question.answer1}
            </li>
            <li
              ref={Answer2}
              onClick={(e) => {
                answerCheck(e, 2);
              }}
            >
              {question.answer2}
            </li>
            <li
              ref={Answer3}
              onClick={(e) => {
                answerCheck(e, 3);
              }}
            >
              {question.answer3}
            </li>
            <li
              ref={Answer4}
              onClick={(e) => {
                answerCheck(e, 4);
              }}
            >
              {question.answer4}
            </li>
          </ul>
          <button onClick={nextBtn}>Next Question</button>
          <p>
            {index + 1} of {data.length} questions
          </p>
        </>
      )}
      {result ? (
        <>
          <h2 className="result">
            Your score is {score} out of {data.length}
          </h2>
          <button onClick={tryBtn}>Start again <i class="fa-solid fa-arrow-rotate-left"></i></button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Quiz;
