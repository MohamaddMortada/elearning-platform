import React, { useState } from "react";
import { login } from "../auth.js";

const Login = () => {
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const token = await login(name, password);
      alert("Login successful!");
      console.log(token);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setname(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
