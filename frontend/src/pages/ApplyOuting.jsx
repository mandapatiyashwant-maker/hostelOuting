import { useState } from "react";
import api from "../services/api";

function ApplyOuting() {
  const [outDate, setOutDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await api.post("/outing/apply", {
        student_id: 1,
        out_date: outDate,
        return_date: returnDate,
        reason: reason
      });

      alert(res.data.message);
    } catch (error) {
      alert("Failed to submit outing request");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Apply Outing</h1>

      <input
        type="date"
        onChange={(e) => setOutDate(e.target.value)}
      />

      <br /><br />

      <input
        type="date"
        onChange={(e) => setReturnDate(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Reason"
        onChange={(e) => setReason(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSubmit}>
        Submit Request
      </button>
    </div>
  );
}

export default ApplyOuting;