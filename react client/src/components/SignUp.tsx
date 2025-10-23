import React, { useState } from "react";
import "./styling/Login.css";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleGoogleSignUp = () => {
    // stub: implement Firebase or OAuth here
    alert("Google sign-up is not wired. Use Firebase/Auth provider.");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]") as Array<any>;
    
    // Check if user already exists
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      alert("User with this email already exists!");
      return;
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password, // In real app, hash this password!
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    
    // Auto-login after signup
    localStorage.setItem("loggedInUser", JSON.stringify(newUser));
    alert(`Welcome to Smart Comparer${name ? `, ${name}` : ""}!`);
    
    // Redirect to home
    window.location.href = "/home";
  };

  return (
    <>
      <div className="auth-container">
        <div className="auth-card">
          <img className="logo" src="/smart-compare-1.svg" alt="Smart Comparer Logo" />
          <h1 className="auth-subtitle">Smart Comparer</h1>
          <p className="app-description">We compare prices across trusted stores</p>

          <button className="btn-google" onClick={handleGoogleSignUp} type="button">
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
              id="signup-name"
              type="text"
              placeholder="Full Name"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              id="signup-email"
              type="email"
              placeholder="Enter Email"
              className="form-input"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              id="signup-password"
              type="password"
              placeholder="Enter Password"
              className="form-input"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              id="signup-confirm-password"
              type="password"
              placeholder="Confirm Password"
              className="form-input"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button type="submit" className="btn-primary">
              Sign Up
            </button>
          </form>

          <div className="auth-switch">
            <span>Already have an account?</span>
            <a className="register-link" href="/login">
              Login
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;