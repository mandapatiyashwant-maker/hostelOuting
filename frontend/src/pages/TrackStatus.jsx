import { useEffect, useState } from "react";

function TrackStatus() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/status")
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        color: "white",
        padding: "20px",
      }}
    >
      <h1>Track Outing Status</h1>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          marginTop: "20px",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Out Date</th>
            <th>Return Date</th>
            <th>Mentor Status</th>
            <th>Warden Status</th>
            <th>Final Status</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.out_date}</td>
              <td>{request.return_date}</td>
              <td>{request.mentor_status}</td>
              <td>{request.warden_status}</td>
              <td>{request.final_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TrackStatus;