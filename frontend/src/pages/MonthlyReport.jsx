import { useEffect, useState } from "react";
import axios from "axios";

function MonthlyReport() {

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/pass/monthly-deductions")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>

      <h1>Monthly Deduction Report</h1>

      <table border="1">

        <thead>
          <tr>
            <th>Student ID</th>
            <th>Month</th>
            <th>Total Deduction</th>
          </tr>
        </thead>

        <tbody>

          {data.map((item, index) => (

            <tr key={index}>
              <td>{item.student_id}</td>
              <td>{item.month}</td>
              <td>₹{item.total_deduction}</td>
            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default MonthlyReport;