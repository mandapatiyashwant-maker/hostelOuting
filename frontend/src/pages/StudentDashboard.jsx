import { Link } from "react-router-dom";

function StudentDashboard() {
  return (
    <div>
      <h1>Student Dashboard</h1>

      <Link to="/apply">
        <button>Apply Outing</button>
      </Link>
    </div>
  );
}

export default StudentDashboard;