import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import GameIntroPage from './pages/GameIntroPage'
import GamePlayPage from './pages/GamePlayPage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game/:gameId" element={<GameIntroPage />} />
        <Route path="/game/:gameId/play" element={<GamePlayPage />} />
      </Routes>
    </Layout>
  )
}

export default App
