import { useEffect, useState } from "react";
import axios from "axios";

function MentorDashboard() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/mentor");
      setRequests(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const approveRequest = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/mentor/approve/${id}`);
      alert("Request Approved");
      fetchRequests();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div>
      <h1>Mentor Dashboard</h1>

      <table border="1" cellPadding="10">
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

export default MentorDashboard;