import { useContext, useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar/Navbar";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { AuthContext } from "./contexts/authContext";

function App() {
  const { isLoading, currentUser } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      {!isLoading && (
        <>
          <Routes>
            <Route path="*">
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Signup />} />
              <Route
                path="home/*"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route path="" element={<Navigate to="home" />} />
            </Route>
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
