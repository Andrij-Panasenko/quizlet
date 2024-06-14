import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';

import { AppLayout } from 'components/AppLayout/AppLayout';
const MainPage = lazy(() => import('pages/MainPage'))
const QuizletPage = lazy(() => import('pages/QuizletPage'))
const QuizPassagePage = lazy(() => import('pages/QuizPassagePage'))
const PassedQuizzesPage = lazy(()=>import('pages/PassedQuizzesPage'))

function App() {
    return (
      <>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<MainPage />} />
            <Route path="/quizes" element={<QuizletPage />} />
            <Route path="/quizes/:quizID" element={<QuizPassagePage />} />
            <Route path="/passed-quizzes" element={<PassedQuizzesPage/> } />
          </Route>
        </Routes>
      </>
    );
}

export default App;
