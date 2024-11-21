export const login = async (name, password) => {
    const response = await fetch("http://localhost/elearning-platform/servers/auth.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password }),
    });
    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token); 
      return data.token;
    } else {
      throw new Error(data.error || "Login failed");
    }
  };
  
  export const signup = async (name, password) => {
    const response = await fetch("http://localhost/elearning-platform/servers/signUp.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password}),
    });
    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token); 
      return data.token;
    } else {
      throw new Error(data.error || "Signup failed");
    }
  };
  
  export const isAuthenticated = () => !!localStorage.getItem("token");
  