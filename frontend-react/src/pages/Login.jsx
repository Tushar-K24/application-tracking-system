import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import baseUrl from "../config";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthToken, currentUser, setCurrentUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: email,
      password: password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${baseUrl}/organization/auth/login`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const res = JSON.parse(result);
        const user = res.user;
        const authToken = res.accessToken;
        if (authToken) {
          localStorage.setItem("authToken", authToken);
          setAuthToken(authToken);
        }
        if (user) {
          setCurrentUser(user);
        }
      })
      .catch((error) => console.log("error", error));
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div className="auth-screen">
        <div className="auth-form-container">
          <h1 id="auth-form-title">Login</h1>
          <form className="auth-form" onSubmit={handleSubmit}>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button type="submit">Login</button>
          </form>
          <p>
            Don't have an account? <Link to="/register">Register here</Link>.
          </p>
        </div>
      </div>
      {currentUser && <Navigate to="/home" />}
    </>
  );
}

export default Login;
