import { PassedQuizzesList } from 'components/PassedQuizzesList/PassedQuizzesList';
import { PASSED_QUIZZES } from 'helpers/storageKey';
import { useEffect, useState } from 'react';
import { Quiz } from 'types/types';

const PassedQuizzesPage = () => {
  const [passedQuizzes, setPassedQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    setPassedQuizzes(
      JSON.parse(window.localStorage.getItem(PASSED_QUIZZES) || '[]')
    );
  }, []);

  return (
    <>
      <section>
        <div className="container mx-auto px-4 py-8">
          {passedQuizzes.length === 0 ? (
            <h2>Empty passed quizzes page</h2>
          ) : (
            <PassedQuizzesList passedQuizzes={passedQuizzes} />
          )}
        </div>
      </section>
    </>
  );
};

export default PassedQuizzesPage;
