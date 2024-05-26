import { useEffect, useState } from 'react';
import { QUIZZES_KEY } from '../../../helpers/storageKey';
import { QuizletItem } from '../QuizletItem/QuizletItem';
import { Quiz } from 'types/types';

export const QuizletList = () => {
  const [quizes, setQuizes] = useState<Quiz[]>([]);
  const [filterValue, setFilterValue] = useState<string>('');

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

  const filteredQuizzes = quizes.filter((quiz) => {
    const hasQuiz = quiz.quizTitle
      .toLocaleLowerCase()
      .includes(filterValue.toLocaleLowerCase());
    return hasQuiz;
  });

  return (
    <>
      <div className="container px-4 py-8 m-auto">
        <input
          type="text"
          placeholder="Serach quizzes"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          className="w-full border border-gray-400 rounded-md mb-4 py-2 px-4 focus:outline-none focus:border-blue-500 bg-gray-100"
        />
        {quizes.length === 0 ? (
          <h2 className="font-bold uppercase text-2xl max-w-96 text-center flex mx-auto">
            Seems you don't have any quizzes so far. Please add some in main
            page
          </h2>
        ) : (
          <ul className="flex flex-wrap gap-3 my-8">
            {filteredQuizzes.map((quiz: Quiz) => (
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
