import { QUIZZES_KEY, QUIZZ_TIMER } from 'helpers/storageKey';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Quiz } from '../types/types';
import { QuestionsList } from 'components/QuestionsList/QuestionsList';

const getStoragedTime = () => {
  const savedTime = localStorage.getItem(QUIZZ_TIMER);
  return savedTime ? JSON.parse(savedTime) : 0;
};

const QuizPassagePage = () => {
  const [quiz, setQuiz] = useState<Quiz[]>([]);
  const [time, setTime] = useState<number>(getStoragedTime);
  const [questionIdx, setQuestionIdx] = useState<number>(0);
  const param = useParams<{ quizID: string }>();

  const intervalRef = useRef<number | null>(null);

  //get quizzes from local storage
  useEffect(() => {
    const getStoragedQuiz = window.localStorage.getItem(QUIZZES_KEY);

    const parsedQuizzes = getStoragedQuiz ? JSON.parse(getStoragedQuiz) : [];

    const currentQuiz = parsedQuizzes.filter(
      (item: Quiz) => item.quizTitle === param.quizID
    );
    setQuiz(currentQuiz);
  }, [param.quizID]);

  const setNextQuestion = () => {
    setQuestionIdx(questionIdx + 1);
  };

  //set timer value to local storage
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        const newTime = prevTime + 1;
        window.localStorage.setItem(QUIZZ_TIMER, JSON.stringify(newTime));
        return newTime;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        window.localStorage.setItem(QUIZZ_TIMER, '0');
      }
    };
  }, []);

  const formatedTime = (totalSec: number) => {
    const seconds = totalSec % 60;
    const minites = Math.floor((totalSec % 3600) / 60);
    const hours = Math.floor(totalSec / 3600);

    return `${String(hours).padStart(2, '0')}:${String(minites).padStart(
      2,
      '0'
    )}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <>
      {quiz.length && (
        <div className="container px-4 py-8 m-auto">
          <p className="text-xl text-center mb-3">Topic of this quiz</p>
          <h1 className="sentence text-2xl font-bold mb-10 text-center">
            {quiz[0].quizTitle}
          </h1>
          <QuestionsList
            question={quiz[0].questions[questionIdx]}
            questionIdx={questionIdx}
            totalQuestions={quiz[0].questions.length}
          />
          <div className="flex justify-between">
            {questionIdx !== quiz[0].questions.length - 1 ? (
              <button
                onClick={setNextQuestion}
                className="px-2.5 py-0.5 bg-green-500 rounded-full text-white hover:bg-green-600 transition"
              >
                Next &gt;
              </button>
            ) : (
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">
                Submit quiz
              </button>
            )}
            <div>
              <p className="text-lg font-semibold">{formatedTime(time)}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuizPassagePage;
