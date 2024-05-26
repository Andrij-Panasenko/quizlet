import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { Quiz } from 'types/types';

interface Props {
  data: Quiz;
  deleteQuiz: (quizTitle: string) => void;
}

export const QuizletItem = ({ data, deleteQuiz }: Props) => {
  const { quizTitle, questions } = data;

  const handleMoveToQuiz = (e: MouseEvent) => {
    if (
      !confirm(
        'By clicking this button quiz will start and timer will be launched. Are you ready?'
      )
    ) {
      e.preventDefault();
    }
  };
  return (
    <>
      <li className="px-6 py-6 border-2 border-indigo-400 rounded-lg font-semibold w-[calc((100%-24px)/3)]">
        <div className="flex justify-between items-center mb-5">
          <h2 className="uppercase ">{quizTitle}</h2>
          <button
            type="button"
            onClick={() => deleteQuiz(quizTitle)}
            className="block px-2 py-1 text-white rounded-lg bg-red-500 hover:bg-red-400 transition"
          >
            Delete
          </button>
        </div>
        <div className="flex justify-between items-center">
          <p>Questions {questions.length}</p>
          <Link
            onClick={handleMoveToQuiz}
            to={`/quizes/${quizTitle}`}
            className="block px-2 py-1 text-white rounded-lg bg-green-500 hover:bg-green-400 transition"
          >
            Move to quiz
          </Link>
        </div>
      </li>
    </>
  );
};
