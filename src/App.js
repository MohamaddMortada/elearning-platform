import React, { useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/Header";
import MainAuth from "./auth/MainAuth";

function App() {
  const [userType, setUserType] = useState("admin"); 

  return (
    <div>
      <Header userType={userType} />
      <MainAuth/>
      <AppRoutes />
    </div>
  );
}

export default App;
