import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path= "/login" element= {<div>Login Page</div>} />
        <Route path= "/register" element= {<div>Register Page</div>} />
        <Route path= "/dashboard" element= {<div>Dashboard Page</div>} />
        <Route path= "/" element= {<Navigate to="/login" replace/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
