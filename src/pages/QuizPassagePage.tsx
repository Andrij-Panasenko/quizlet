import { QUIZZES_KEY } from 'helpers/storageKey';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Quiz } from '../types/types';
import { QuestionsList } from 'components/QuestionsList/QuestionsList';

const QuizPassagePage = () => {
  const [quiz, setQuiz] = useState<Quiz[]>([]);

  const [questionIdx, setQuestionIdx] = useState<number>(0);
  const param = useParams<{ quizID: string }>();

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
        </div>
      )}
    </>
  );
};

export default QuizPassagePage;
