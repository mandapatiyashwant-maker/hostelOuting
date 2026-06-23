import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import ApplyOuting from "./pages/ApplyOuting";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/apply" element={<ApplyOuting />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;