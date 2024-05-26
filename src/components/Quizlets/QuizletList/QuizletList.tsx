import { useEffect, useState } from 'react';
import { QUIZZES_KEY } from '../../../helpers/storageKey';
import { QuizletItem } from '../QuizletItem/QuizletItem';
import { Quiz } from 'types/types';

export const QuizletList = () => {
  const [quizes, setQuizes] = useState<Quiz[]>([]);

  useEffect(() => {
    const getStoragedQuiz = window.localStorage.getItem(QUIZZES_KEY);

    const parsedQuizzes = getStoragedQuiz ? JSON.parse(getStoragedQuiz) : [];

    setQuizes(parsedQuizzes);
  }, []);

  const deleteQuiz = (quizTitle: string) => {
    const newQuizes = quizes.filter((quiz) => quiz.quizTitle !== quizTitle);
    setQuizes(newQuizes);
    window.localStorage.setItem(QUIZZES_KEY, JSON.stringify(newQuizes));
  };

  return (
    <>
      <div className="container px-4 py-8 m-auto">
        {quizes.length === 0 ? (
          <h2 className="font-bold uppercase text-2xl max-w-96 text-center flex mx-auto">
            Seems you don't have any quizzes so far. Please add some in main
            page
          </h2>
        ) : (
          <ul className="flex flex-wrap gap-3 my-8">
            {quizes.map((quiz: Quiz) => (
              <QuizletItem
                key={quiz.quizTitle}
                data={quiz}
                deleteQuiz={deleteQuiz}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
