import { Route, Routes } from 'react-router-dom';
import DisplayModal from './components/modals/DisplayModal';
import ProtectedRoute from './components/ProtectedRoute';
import GamePage from './pages/GamePage';
import { default as HomePage } from './pages/Home';
import NotFound from './pages/NotFound';

function App() {
  /**
   * Return an error page if the user is accessing a site on mobile
   */
  const mql = window.matchMedia('(max-width: 750px)');
  if (mql.matches) return <DisplayModal message={"Mobile and tablet support for this page is not yet available"} />

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
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App;
