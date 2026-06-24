import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import ApplyOuting from "./pages/ApplyOuting";
import TrackStatus from "./pages/TrackStatus";
import MentorDashboard from "./pages/MentorDashboard";
import WardenDashboard from "./pages/WardenDashboard";
import ViewPass from "./pages/ViewPass";
import MessDeduction from "./pages/MessDeduction";
import AdminDashboard from "./pages/AdminDashboard";
import MonthlyDeductions from "./pages/MonthlyDeductions";
import MonthlyReport from "./pages/MonthlyReport";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/apply" element={<ApplyOuting />} />
        <Route path="/status" element={<TrackStatus />} />
        <Route path="/mentor" element={<MentorDashboard />} />
        <Route path="/warden" element={<WardenDashboard />} />
        <Route path="/pass" element={<ViewPass />} />
        <Route path="/deductions" element={<MessDeduction />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/monthly-deductions" element={<MonthlyDeductions />} />
        <Route path="/monthly-report" element={<MonthlyReport />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;