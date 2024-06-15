import { formatedTime } from 'helpers/formattedTime';
import { FC } from 'react';
import { Quiz } from 'types/types';

interface IPassedQuizzes {
  passedQuizzes: Quiz[];
}

export const PassedQuizzesList: FC<IPassedQuizzes> = ({ passedQuizzes }) => {
  console.log(passedQuizzes);
  return (
    <>
      <ul>
        {passedQuizzes.map((quiz, idx: number) => (
          <li
            key={idx}
            className="px-6 py-6 border-2 border-indigo-400 rounded-lg mb-6"
          >
            <div className="font-semibold flex justify-between">
              <h2 className="sentence">{quiz.quizTitle}</h2>
              <p>Time spent: {formatedTime(quiz.time)}</p>
            </div>
            <p>Total questions: {quiz.questions.length}</p>
            <p>Correct answers: {}</p>
            <p>Passage percent: 0%</p>
          </li>
        ))}
      </ul>
    </>
  );
};
