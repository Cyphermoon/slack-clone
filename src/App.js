import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
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
      </Routes>
    </div>
  )
}

export default App;
