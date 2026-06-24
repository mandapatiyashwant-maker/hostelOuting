import { useEffect, useState } from "react";
import axios from "axios";

function MessDeduction() {
  const [data, setData] = useState([]);

  const loadDeductions = () => {
    axios
      .get("http://localhost:5000/api/pass/deductions")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const calculateDeductions = () => {
    axios
      .post("http://localhost:5000/api/pass/calculate-deduction")
      .then((res) => {
        alert(res.data.message);
        loadDeductions();
      })
      .catch((err) => {
        console.log(err);
        alert("Error calculating deductions");
      });
  };

  useEffect(() => {
    loadDeductions();
  }, []);

  return (
    <div>
      <h1>Mess Deduction Report</h1>

      <button onClick={calculateDeductions}>
        Calculate Deductions
      </button>

      <br />
      <br />

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Student ID</th>
            <th>Month</th>
            <th>Deduction Amount</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.student_id}</td>
              <td>{item.month}</td>
              <td>₹{item.deduction_amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MessDeduction;