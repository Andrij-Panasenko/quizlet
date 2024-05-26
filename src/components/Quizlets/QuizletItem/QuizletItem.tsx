import { Quiz } from "types/types";

interface Props {
  data: Quiz; 
}

export const QuizletItem = ({ data }: Props) => {
  const { quizTitle, questions } = data;
  return (
    <>
      <li className="px-6 py-6 border-2 border-indigo-400 rounded-lg font-semibold w-[calc((100%-24px)/3)]">
        <h2 className="uppercase mb-5">{quizTitle}</h2>
        <div className="flex justify-between items-center">
          <p>Questions {questions.length}</p>
          <button
            type="button"
            className="block px-2 py-1 text-white rounded-lg bg-green-500 hover:bg-green-400 transition"
          >
            Move to quiz
          </button>
        </div>
      </li>
    </>
  );
};
