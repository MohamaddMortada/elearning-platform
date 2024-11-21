import React, { useState } from "react";
import { signup } from "./auth.js";

const SignUp = () => {
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const token = await signup(name, password);
      alert("Signup successful!");
      console.log(token);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h1>SignUp</h1>
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
      <button type="submit">SignUp</button>
    </form>
  );
};

export default SignUp;
