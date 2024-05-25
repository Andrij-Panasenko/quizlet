import { useState } from 'react';
import { Quiz } from 'types/types';

const initialQuiz: Quiz = {
  quizTitle: '',
  questions: [
    {
      question: '',
      answers: [{ text: '', correct: false }],
    },
  ],
};

export const QuizAddForm = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([initialQuiz]);

  //adding new answer field
  const addAnswerField = (quizIndex: number, questionIdx: number) => {
    const newQuiz = quizzes.map((quiz, i) =>
      i === quizIndex
        ? {
            ...quiz,
            questions: quiz.questions.map((question, j) =>
              j === questionIdx
                ? {
                    ...question,
                    answers: [
                      ...question.answers,
                      { text: '', correct: false },
                    ],
                  }
                : question
            ),
          }
        : quiz
    );
    setQuizzes(newQuiz);
  };

  const removeAnswerField = (
    quizIndex: number,
    questionIndex: number,
    answerIndex: number
  ) => {
    const newQuiz = quizzes.map((quiz, i) =>
      i === quizIndex
        ? {
            ...quiz,
            questions: quiz.questions.map((question, j) =>
              j === questionIndex
                ? {
                    ...question,
                    answers: question.answers.filter(
                      (_, k) => k !== answerIndex
                    ),
                  }
                : question
            ),
          }
        : quiz
    );
    setQuizzes(newQuiz);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Create a New Quiz</h1>
        <form className="space-y-4" id="quiz-form">
          {quizzes.map((quiz, quizIdx) => (
            <div key={quizIdx}>
              <div>
                <label htmlFor={`quiz-title-${quizIdx}`} className="block mb-1">
                  Quiz Title
                </label>
                <input
                  id={`quiz-title-${quizIdx}`}
                  type="text"
                  name="quizTitle"
                  // value={quiz.quizTitle}
                  // onChange={}
                  required
                  className="w-full border-gray-300 rounded-md mb-4 py-2 px-4 focus:outline-none focus:border-blue-500 bg-gray-100"
                />
              </div>
              {quiz.questions.map((question, questionIdx) => (
                <div key={questionIdx}>
                  <div>
                    <label htmlFor={`question-${quizIdx}-${questionIdx}`}>
                      Question
                    </label>
                    <input
                      id={`question-${quizIdx}-${questionIdx}`}
                      type="text"
                      name="question"
                      // value={question.question}
                      // onChange={}
                      required
                      className="w-full border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500 bg-gray-100"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block mb-1">Answers</label>
                    {question.answers.map((answer, answerIdx) => (
                      <div
                        key={answerIdx}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="radio"
                          name={`correct-answer-${questionIdx}-${answerIdx}`}
                          // checked={answer.correct}
                          // onChange={}
                        />
                        <input
                          type="text"
                          // value={answer.text}
                          // onChange={}
                          required
                          className="w-full border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500 bg-gray-100"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            removeAnswerField(quizIdx, questionIdx, answerIdx)
                          }
                          className="px-2.5 py-0.5 bg-red-500 rounded-full text-white hover:bg-red-600 transition"
                        >
                          X
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addAnswerField(quizIdx, questionIdx)}
                      className="px-2.5 py-0.5 bg-green-500 rounded-full text-white hover:bg-green-600 transition"
                    >
                      Add answer variant
                    </button>
                  </div>
                  <button
                    type="button"
                    // onClick={}
                    className="px-2.5 py-0.5 bg-green-500 rounded-full text-white mt-2 mb-5"
                  >
                    Add Question
                  </button>
                </div>
              ))}
            </div>
          ))}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Create quiz
          </button>
        </form>
      </div>
    </>
  );
};

