
import AppBody from './components/AppBody';
import Header from './components/Header';
import LoginScreen from './components/LoginScreen';
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from './firebase';

function App() {
  const [user, loading] = useAuthState(auth);

  return (
    <div className="app" style={{ height: "100vh" }}>
      {!user && <LoginScreen />}

      {user &&
        <>
          <Header />
          <AppBody />
        </>}

    </div>
  );
}

export default App;
