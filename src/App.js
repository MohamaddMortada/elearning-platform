import React, { useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/Header";

function App() {
  const [userType, setUserType] = useState("admin"); 

  return (
    <div>
      <Header userType={userType} />
      <AppRoutes />
    </div>
  );
}

export default App;
