import { QUIZZES_KEY } from '../../../helpers/storageKey';
import { QuizletItem } from '../QuizletItem/QuizletItem';
import { Quiz } from 'types/types';

export const QuizletList = () => {
  const getStoragedQuiz = window.localStorage.getItem(QUIZZES_KEY);

  const parsedQuizzes = getStoragedQuiz ? JSON.parse(getStoragedQuiz) : [];

  return (
    <>
      <div className="container px-4 py-8 m-auto">
        {parsedQuizzes.length === 0 ? (
          <h2 className="font-bold uppercase text-2xl max-w-96 text-center flex mx-auto">
            Seems you don't have any quizzes so far. Please add some in main
            page
          </h2>
        ) : (
          <ul className="flex flex-wrap gap-3 my-8">
            {parsedQuizzes.map((quiz: Quiz) => (
              <QuizletItem key={quiz.quizTitle} data={quiz} />
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
