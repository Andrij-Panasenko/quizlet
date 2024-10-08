import { FormEvent } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Quiz } from 'types/types';
import  {QUIZZES_KEY}  from '../../helpers/storageKey';

const initialQuiz: Quiz = {
  quizTitle: '',
  questions: [
    {
      question: '',
      answers: [{ text: '', correct: false }],
    },
  ],
  time: 234,
};

export const QuizAddForm = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([initialQuiz]);

  //adding new answer field to state
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

  //removing answer field from state
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

  //add new question to state
  const addQuestion = (quizIdx: number) => {
    const newQuiz = quizzes.map((quiz, i) =>
      i === quizIdx
        ? {
            ...quiz,
            questions: [
              ...quiz.questions,
              { question: '', answers: [{ text: '', correct: false }] },
            ],
          }
        : quiz
    );
    setQuizzes(newQuiz);
  };

  // remove question from state
  const removeQuestion = (quizIdx: number, questionIdx: number) => {
    const newQuiz = quizzes.map((quiz, i) =>
      i === quizIdx
        ? {
            ...quiz,
            questions: quiz.questions.filter((_, j) => j !== questionIdx),
          }
        : quiz
    );
    setQuizzes(newQuiz);
  };

  // set quiz title to state
  const setQuizTitle = (quizIdx: number, value: string) => {
    const newTitle = quizzes.map((quiz, i) =>
      i === quizIdx ? { ...quiz, quizTitle: value } : quiz
    );
    setQuizzes(newTitle);
  };

  // set question value to state
  const setQuestion = (quizIdx: number, questionIdx: number, value: string) => {
    const newQuestion = quizzes.map((quiz, i) =>
      i === quizIdx
        ? {
            ...quiz,
            questions: quiz.questions.map((question, j) =>
              j === questionIdx ? { ...question, question: value } : question
            ),
          }
        : quiz
    );
    setQuizzes(newQuestion);
  };

  //set answer value to state
  const setAnswer = (
    quizIdx: number,
    questionIdx: number,
    answerIdx: number,
    value: string
  ) => {
    const newAnswer = quizzes.map((quiz, i) =>
      i === quizIdx
        ? {
            ...quiz,
            questions: quiz.questions.map((question, j) =>
              j === questionIdx
                ? {
                    ...question,
                    answers: question.answers.map((answer, k) =>
                      k === answerIdx ? { ...answer, text: value } : answer
                    ),
                  }
                : question
            ),
          }
        : quiz
    );
    setQuizzes(newAnswer);
  };

  //set correct value answer to state
  const setCorrectAnswer = (
    quizIdx: number,
    questionIdx: number,
    answerIdx: number
  ) => {
    const newQuizzes = quizzes.map((quiz, i) =>
      i === quizIdx
        ? {
            ...quiz,
            questions: quiz.questions.map((question, j) =>
              j === questionIdx
                ? {
                    ...question,
                    answers: question.answers.map((answer, k) => ({
                      ...answer,
                      correct: k === answerIdx,
                    })),
                  }
                : question
            ),
          }
        : quiz
    );
    setQuizzes(newQuizzes);
  };

  // imitation request to DB using promise resolve
  const imitationDbRequest = (data: Quiz[]) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 500);
    });
  };

  const submitQuizForm = async (e: FormEvent) => {
    e.preventDefault();

    //get current storaged quizzes
    const currestQuizzesInStorage = window.localStorage.getItem(QUIZZES_KEY);

    // parsing quizzes from storsge
    const storagedQuizzes = currestQuizzesInStorage
      ? JSON.parse(currestQuizzesInStorage)
      : [];

    // spreding prev storaged quizzes and new
    const newQuizzes = [...storagedQuizzes, ...quizzes];

    // set new quizzes in storage
    try {
      const updatetQuizzes = await imitationDbRequest(newQuizzes);
      window.localStorage.setItem(QUIZZES_KEY, JSON.stringify(updatetQuizzes));
      setQuizzes([initialQuiz])
      toast.success('New quiz was successfuly saved');
    } catch (error) {
      console.error('Failed to set quiz. Try again later', error);
    }
  };

  return (
    <section>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Create a New Quiz</h1>
        <form className="" id="quiz-form" onSubmit={submitQuizForm}>
          {quizzes.map((quiz, quizIdx) => (
            <div key={quizIdx}>
              <div>
                <label
                  htmlFor={`quiz-title-${quizIdx}`}
                  className="block mb-1 text-2xl"
                >
                  Quiz Title
                </label>
                <input
                  id={`quiz-title-${quizIdx}`}
                  type="text"
                  name="quizTitle"
                  placeholder="Quiz title"
                  value={quiz.quizTitle || ''}
                  onChange={(e) => setQuizTitle(quizIdx, e.target.value)}
                  required
                  className="w-full border-gray-300 rounded-md mb-4 py-2 px-4 focus:outline-none focus:border-blue-500 bg-gray-100"
                />
              </div>
              {quiz.questions.map((question, questionIdx) => (
                <div key={questionIdx}>
                  <div>
                    <div className="flex justify-between mb-2">
                      <label
                        htmlFor={`question-${quizIdx}-${questionIdx}`}
                        className="text-xl"
                      >
                        Question
                      </label>
                      <button
                        type="button"
                        onClick={() => removeQuestion(quizIdx, questionIdx)}
                        className="px-2.5 py-0.5 bg-red-500 rounded-full text-white hover:bg-red-600 transition"
                      >
                        Remove question
                      </button>
                    </div>
                    <input
                      id={`question-${quizIdx}-${questionIdx}`}
                      type="text"
                      name="question"
                      placeholder={`Set question number ${questionIdx + 1}`}
                      value={question.question || ''}
                      onChange={(e) =>
                        setQuestion(quizIdx, questionIdx, e.target.value)
                      }
                      required
                      className="w-full border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500 bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-lg">Answers</label>
                    {question.answers.map((answer, answerIdx) => (
                      <div
                        key={answerIdx}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="radio"
                          name={`correct-answer-${quizIdx}-${questionIdx}`}
                          checked={answer.correct}
                          onChange={() =>
                            setCorrectAnswer(quizIdx, questionIdx, answerIdx)
                          }
                        />
                        <input
                          type="text"
                          placeholder={`Answer variant ${answerIdx + 1}`}
                          value={answer.text || ''}
                          onChange={(e) =>
                            setAnswer(
                              quizIdx,
                              questionIdx,
                              answerIdx,
                              e.target.value
                            )
                          }
                          required
                          className="w-full border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500 bg-gray-100 mb-2"
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
                      className="px-2.5 py-0.5 mb-4 bg-green-500 rounded-full text-white hover:bg-green-600 transition"
                    >
                      Add answer variant
                    </button>
                  </div>
                  <div className="flex justify-between items-center mb-5"></div>
                </div>
              ))}
              <div className="flex justify-between items-center mb-5">
                <button
                  type="button"
                  onClick={() => addQuestion(quizIdx)}
                  className="px-2.5 py-0.5 bg-green-500 rounded-full text-white hover:bg-green-600 transition"
                >
                  Add Question
                </button>
              </div>
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
    </section>
  );
};
