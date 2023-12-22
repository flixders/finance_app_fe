import { useState, useEffect } from "react";
import LogoutButton from "./components/App/LogoutButton";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/App/NavBar";
import RegistrationPage from "./components/Pages/TransactionRegistration";
import LoginPage from "./components/Login/LoginPage";
import TransactionOverview from "./components/Pages/TransactionOverview";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogoutSuccess = () => {
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <>
      <Router basename="/">
        {isLoggedIn ? (
          <>
            <NavBar />
            <LogoutButton onLogoutSuccess={handleLogoutSuccess} />
            <Routes>
              <Route path="/overzicht" element={<TransactionOverview />} />
              <Route
                path="/registratie"
                element={<RegistrationPage isLoggedIn={isLoggedIn} />}
              />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route
              path="/login"
              element={<LoginPage onLoginSuccess={handleLoginSuccess} />}
            />
          </Routes>
        )}
      </Router>
    </>
  );
}
export default App;
