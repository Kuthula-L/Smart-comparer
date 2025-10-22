export default class LoginForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        form {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 24px;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          width: 320px;
        }
        input {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 8px;
        }
        button {
          background: #007bff;
          color: white;
          padding: 10px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }
        button:hover { background: #0056b3; }
        a { color: #007bff; text-align: center; font-size: 14px; }
      </style>

      <form id="loginForm">
        <h2>Login</h2>
        <input type="email" id="email" placeholder="Email" required />
        <input type="password" id="password" placeholder="Password" required />
        <button type="submit">Login</button>
        <a href="../register/register.html">Don't have an account? Register</a>
      </form>
    `;

    this.shadowRoot
      .querySelector("#loginForm")
      .addEventListener("submit", this.handleLogin.bind(this));
  }

  handleLogin(e) {
    e.preventDefault();
    const email = this.shadowRoot.querySelector("#email").value.trim();
    const password = this.shadowRoot.querySelector("#password").value.trim();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      alert(`Welcome back, ${user.name || "User"}!`);
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      // redirect to main page
      window.location.href = "../../index.html";
    } else {
      alert("Invalid email or password");
    }
  }
}
<<<<<<< HEAD
=======

>>>>>>> ef891e11a7eb52bf618c35721f4ebc7d364aded7
