import { PASSED_QUIZZES, QUIZZES_KEY, QUIZZ_TIMER } from 'helpers/storageKey';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Question, Quiz, UserAnswer, QuizResult } from '../types/types';
import { QuestionsList } from 'components/QuestionsList/QuestionsList';

const getStoragedTime = () => {
  const savedTime = localStorage.getItem(QUIZZ_TIMER);
  return savedTime ? JSON.parse(savedTime) : 0;
};

const QuizPassagePage = () => {
  const [isSubmittedQuiz, setIsSubmittedQuiz] = useState<boolean>(false);
  const [selectedAnswers, setSelectedAnswers] = useState<UserAnswer>({});
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
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

  // set timer value to local storage
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        const newTime = prevTime + 1;
        window.localStorage.setItem(QUIZZ_TIMER, JSON.stringify(newTime));
        return newTime;
      });
    }, 100);

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

  const setAnswers = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswers((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const isCorrectAnswer = (quiz: Quiz[], userAnswers: UserAnswer) => {
    if (!quiz[0]) return;

    return quiz[0].questions.map((question: Question, idx: number) => {
      const userAnswerKey = `answer-variant-${question.question}-${idx}`;
      const userAnswer = userAnswers[userAnswerKey];
      const correctAnswer = question.answers.find(
        (answer) => answer.correct
      )?.text;
      return {
        question: question.question,
        isCorrect: userAnswer === correctAnswer,
      };
    });
  };

  const submitQuiz = () => {
    const quizResult = isCorrectAnswer(quiz, selectedAnswers);
    setQuizResults(quizResult);
    setIsSubmittedQuiz(true);

    const currentPassedQuizzes = JSON.parse(
      window.localStorage.getItem(PASSED_QUIZZES) || '[]'
    );

    const passedQuiz = {
      ...quiz,
      time,
    };
    const newPassedQuizzes = [...currentPassedQuizzes, passedQuiz];
    
    localStorage.setItem(PASSED_QUIZZES, JSON.stringify(newPassedQuizzes));
  };

  const correct = quizResults.find((item) => item.isCorrect);

  return (
    <>
      {quiz.length && !isSubmittedQuiz && (
        <div className="container px-4 py-8 m-auto">
          <p className="text-xl text-center mb-3">Topic of this quiz</p>
          <h1 className="sentence text-2xl font-bold mb-10 text-center">
            {quiz[0].quizTitle}
          </h1>
          <QuestionsList
            selectAnswers={setAnswers}
            question={quiz[0].questions[questionIdx]}
            questionIdx={questionIdx}
            totalQuestions={quiz[0].questions.length}
          />
          <div className="flex justify-between">
            {questionIdx !== quiz[0].questions.length - 1 ? (
              <button
                // disabled
                onClick={() => setQuestionIdx(questionIdx + 1)}
                className="px-2.5 py-0.5 bg-green-500 rounded-full text-white hover:bg-green-600 transition disabled:bg-slate-500"
              >
                Next &gt;
              </button>
            ) : (
              <button
                onClick={submitQuiz}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
              >
                Submit quiz
              </button>
            )}
            <div>
              <p className="text-lg font-semibold">{formatedTime(time)}</p>
            </div>
          </div>
        </div>
      )}

      {isSubmittedQuiz && (
        <>
          <div className="container px-4 py-8 m-auto">
            <p className="sentence my-5 text-center font-semibold text-xl">
              Your results
            </p>
            <h1 className="sentence text-2xl font-bold mb-10 text-center">
              {quiz[0] && quiz[0].quizTitle}
            </h1>
            {quiz[0] &&
              quiz[0].questions.map((item) => (
                <div key={item.question} className=" mb-7">
                  <h2 className="text-lg mb-3 font-semibold sentence">
                    {item.question}
                  </h2>
                  <ul className="flex flex-col gap-2">
                    {item.answers.map((answer) => (
                      <li
                        key={answer.text}
                        className={`px-3 py-3 rounded-lg mb-2 ${
                          answer.correct === correct?.isCorrect
                            ? 'bg-green-400'
                            : 'bg-slate-300'
                        }`}
                      >
                        <p>{answer.text}</p>
                        {answer.correct}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default QuizPassagePage;
