import React, { useState } from "react";
import "./styling/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleLogin = () => {
    // stub: implement Firebase or OAuth here
    alert("Google sign-in is not wired. Use Firebase/Auth provider.");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]") as Array<any>;
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      alert(`Welcome back${user.name ? `, ${user.name}` : ""}!`);
      // simple redirect — change to react-router navigate if you use router
      window.location.href = "/home";
    } else {
      alert("Invalid email or password.");
    }
  };

  return (
    <>
      <div className="auth-container">
        <div className="auth-card">
          <img className="logo" src="/smart-compare-1.svg" alt="Smart Comparer Logo" />
          <h1 className="auth-subtitle">Smart Comparer</h1>
          <p className="app-description">We compare prices across trusted stores</p>

          <button className="btn-google" onClick={handleGoogleLogin} type="button">
            <img
              className="google-icon"
              src="https://static.vecteezy.com/system/resources/previews/011/598/471/original/google-logo-icon-illustration-free-vector.jpg"
              alt="Google"
            />
            Continue with Google
          </button>

          <div className="divider">
            <div className="divider-line" />
            <span className="divider-text">or</span>
            <div className="divider-line" />
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <input
              id="login-email"
              type="email"
              placeholder="Enter Email"
              className="form-input"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              id="login-password"
              type="password"
              placeholder="Enter Password"
              className="form-input"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="btn-primary">
              Login
            </button>
          </form>

          <div className="auth-switch">
            <span>Don't have an account?</span>
            <a className="register-link" href="/signup">
              Register
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
