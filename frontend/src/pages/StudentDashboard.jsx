import { Link } from "react-router-dom";

function StudentDashboard() {
  return (
    <div>
      <h1>Student Dashboard</h1>

      <Link to="/apply">
        <button>Apply Outing</button>
      </Link>

      <br /><br />

      <Link to="/status">
        <button>Track Status</button>
      </Link>
      <br /><br />

<Link to="/pass">
  <button>View Pass</button>
</Link>

<br /><br />

<Link to="/deductions">
  <button>View Mess Deductions</button>
</Link>
    </div>
  );
}

export default StudentDashboard;