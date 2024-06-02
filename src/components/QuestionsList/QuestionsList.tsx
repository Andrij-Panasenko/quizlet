import { ChangeEvent, FC } from 'react';
import { Question } from '../../types/types';

interface QuestionList {
  selectAnswers: (answer: ChangeEvent<HTMLInputElement>) => void;
  question: Question;
  questionIdx: number;
  totalQuestions: number;
}

export const QuestionsList: FC<QuestionList> = ({
  question,
  questionIdx,
  totalQuestions,
  selectAnswers,
}) => {
  return (
    <>
      <div className="flex justify-between mb-4">
        <h2
          data-question-index={questionIdx}
          className="text-lg font-semibold sentence"
        >
          {question.question}
        </h2>
        <p className="text-lg font-semibold">
          {questionIdx + 1} of {totalQuestions}
        </p>
      </div>
      <ul>
        {question.answers.map((answer, idx) => (
          <li
            key={idx}
            className="flex items-center space-x-2 bg-slate-300 px-3 py-3 rounded-lg mb-2 hover:bg-slate-200 transition"
          >
            <input
              type="radio"
              value={idx + 1}
              name={`answer-variant-${question.question}-${questionIdx}`}
              onChange={(e) => selectAnswers(e)}
            />
            <p className="sentence">{answer.text}</p>
          </li>
        ))}
      </ul>
    </>
  );
};
