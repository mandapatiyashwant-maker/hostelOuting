import { useEffect, useState } from "react";
import axios from "axios";

function ViewPass() {
  const [passes, setPasses] = useState([]);

  useEffect(() => {
    fetchPasses();
  }, []);

  const fetchPasses = async () => {
    const res = await axios.get("http://localhost:5000/api/pass");
    setPasses(res.data);
  };

  return (
    <div>
      <h1>Outing Pass</h1>

      {passes.map((pass) => (
        <div
          key={pass.id}
          style={{
            border: "2px solid white",
            padding: "20px",
            margin: "20px",
          }}
        >
          <h3>Pass ID: {pass.id}</h3>
          <p>Student ID: {pass.student_id}</p>
          <p>Out Date: {pass.out_date}</p>
          <p>Return Date: {pass.return_date}</p>
          <p>Reason: {pass.reason}</p>
          <p>Status: {pass.final_status}</p>
        </div>
      ))}
    </div>
  );
}

export default ViewPass;