import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import GamePage from './pages/GamePage';
import { default as HomePage } from './pages/Home';
import NotFound from './pages/NotFound';
import TestingPage from './pages/TestingPage';

function App() {


  return (
    <div className='app' style={{ height: "100vh" }}>
      <Routes>
        <Route path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />
        <Route path="/game" element={<GamePage />} />
        <Route path="/testing" element={<TestingPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App;
