import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Quiz from './pages/Quiz';
import Results from './pages/Results';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="results" element={<Results />} />
      </Route>
    </Routes>
  );
}
