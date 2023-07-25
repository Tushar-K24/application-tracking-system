import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

import baseUrl from "../config";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name: name,
      email: email,
      password: password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${baseUrl}/organization/auth/signup`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const user = JSON.parse(result).user;
        if (user) {
          setIsSignedUp(true);
          setMessage(JSON.parse(result).message);
        } else {
          setMessage("Please check the details again!");
        }
      })
      .catch((error) => setMessage("error occured, please try again!"));
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="auth-screen">
      <div className="auth-form-container">
        <h1 id="auth-form-title">Sign Up</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
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
          <button type="submit">Sign Up</button>
        </form>
        <p id="auth-message">{message}</p>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
      {isSignedUp && <Navigate to="/login" />}
    </div>
  );
}

export default Signup;
