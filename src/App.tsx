import { useState, useEffect } from "react";
import LogoutButton from "./components/LoginPage/LogoutButton";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/TransactionOverview/NavBar";
import RegistrationPage from "./components/Pages/TransactionRegistration";
import LoginPage from "./components/Pages/LoginPage";
import TransactionOverview from "./components/Pages/TransactionOverview";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <>
      <Router>
        <NavBar />
        <LogoutButton />
        <Routes>
          <Route
            path="/login"
            element={<LoginPage onLoginSuccess={handleLoginSuccess} />}
          />
          <Route
            path="/registratie"
            element={<RegistrationPage isLoggedIn={isLoggedIn} />}
          />
          <Route path="/overzicht" element={<TransactionOverview />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;
