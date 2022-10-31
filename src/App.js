import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import GamePage from './pages/GamePage';
import { default as HomePage } from './pages/Home';

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
      </Routes>
    </div>
  )
}

export default App;
