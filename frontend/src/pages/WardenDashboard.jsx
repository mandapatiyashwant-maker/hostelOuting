import { useEffect, useState } from "react";
import axios from "axios";

function WardenDashboard() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const res = await axios.get("http://localhost:5000/api/warden");
    setRequests(res.data);
  };

  const approveRequest = async (id) => {
    await axios.put(`http://localhost:5000/api/warden/approve/${id}`);
    fetchRequests();
  };

  return (
    <div>
      <h1>Warden Dashboard</h1>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Student ID</th>
            <th>Out Date</th>
            <th>Return Date</th>
            <th>Reason</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((req) => (
            <tr key={req.id}>
              <td>{req.id}</td>
              <td>{req.student_id}</td>
              <td>{req.out_date}</td>
              <td>{req.return_date}</td>
              <td>{req.reason}</td>

              <td>
                <button onClick={() => approveRequest(req.id)}>
                  Approve
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WardenDashboard;