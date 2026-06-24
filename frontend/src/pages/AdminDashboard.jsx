import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {

  const [stats, setStats] = useState({
    students: 0,
    requests: 0,
    approved: 0,
    deductions: 0,
  });

  const [charge, setCharge] = useState("");

  useEffect(() => {
    loadStats();
    loadCharge();
  }, []);

  const loadStats = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/admin/stats"
    );

    setStats(res.data);
  };

  const loadCharge = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/settings"
    );

    setCharge(res.data.mess_charge_per_day);
  };

  const updateCharge = async () => {
    await axios.put(
      "http://localhost:5000/api/settings",
      {
        mess_charge_per_day: charge,
      }
    );

    alert("Mess charge updated");
  };

  return (
    <div>

      <h1>Admin Dashboard</h1>

      <h2>Total Students: {stats.students}</h2>

      <h2>Total Requests: {stats.requests}</h2>

      <h2>Approved Requests: {stats.approved}</h2>

      <h2>
        Total Mess Deductions: ₹{stats.deductions}
      </h2>

      <hr />

      <h2>Mess Charge Per Day</h2>

      <input
        type="number"
        value={charge}
        onChange={(e) =>
          setCharge(e.target.value)
        }
      />

      <button onClick={updateCharge}>
        Update
      </button>

    </div>
  );
}

export default AdminDashboard;