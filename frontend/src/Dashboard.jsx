
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [visits, setVisits] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const [studentsRes, visitsRes, medicinesRes] =
          await Promise.all([
            API.get("/students"),
            API.get("/visits"),
            API.get("/medicines"),
          ]);

        setStudents(studentsRes.data.data || []);
        setVisits(visitsRes.data.data || []);
        setMedicines(medicinesRes.data.data || []);
      } catch (err) {
        setError(
          err.response?.data?.message ||
          "Unable to load dashboard data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const today = new Date().toDateString();

  const todayVisits = visits.filter(
    (visit) =>
      new Date(visit.visitDate).toDateString() === today
  ).length;

  const totalStock = medicines.reduce(
    (total, medicine) =>
      total + Number(medicine.quantity || 0),
    0
  );

  const lowStockCount = medicines.filter(
    (medicine) =>
      Number(medicine.quantity) > 0 &&
      Number(medicine.quantity) <= Number(medicine.minimumStock)
  ).length;

  const stats = [
    {
      title: "Total Students",
      value: students.length,
      icon: "👨‍🎓",
      color: "blue",
    },
    {
      title: "Today's Visits",
      value: todayVisits,
      icon: "🩺",
      color: "green",
    },
    {
      title: "Total Stock Units",
      value: totalStock,
      icon: "💊",
      color: "purple",
    },
    {
      title: "Low Stock Alerts",
      value: lowStockCount,
      icon: "⚠️",
      color: "orange",
    },
  ];

  const availableStock = medicines.filter(
    (medicine) =>
      Number(medicine.quantity) > Number(medicine.minimumStock)
  ).length;

  const availablePercentage =
    medicines.length > 0
      ? Math.round((availableStock / medicines.length) * 100)
      : 0;

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("campuscare_token");
    localStorage.removeItem("campuscare_admin");
    navigate("/login");
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-icon">✚</span>
          <div>
            <h2>CampusCare</h2>
            <p>College Dispensary</p>
          </div>
        </div>

        <p className="menu-label">MAIN MENU</p>

        <nav className="navigation">
          <a className="active" href="/dashboard">▦ Dashboard</a>
          <a href="/students">♙ Students</a>
          <a href="/visits">♡ Dispensary Visits</a>
          <a href="/inventory">▣ Medicine Inventory</a>
          <a href="/distribution">↗ Medicine Distribution</a>
          <a href="/emergency">✚ Emergency Register</a>
          <a href="/reports">▤ Reports & Analytics</a>
        </nav>

        <div className="sidebar-bottom">
          <div className="admin-avatar">A</div>
          <div>
            <strong>Administrator</strong>
            <p>System Admin</p>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="breadcrumb">Pages / Dashboard</p>
            <h2>Dashboard Overview</h2>
          </div>

          <div className="top-actions">
            <span className="today">
              📅 {new Date().toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>

            <button
              className="notification"
              onClick={handleLogout}
              title="Logout"
            >
              ↪
            </button>
          </div>
        </header>

        {loading && <p>Loading dashboard data...</p>}

        {error && <p className="login-error">{error}</p>}

        {!loading && !error && (
          <>
            <section className="welcome">
              <div>
                <p>WELCOME TO CAMPUSCARE</p>
                <h1>Your Campus Health,<br />Our Priority.</h1>
                <span>
                  Manage dispensary activities and keep your campus healthy.
                </span>
              </div>
              <div className="welcome-icon">✚</div>
            </section>

            <section className="stats-grid">
              {stats.map((item) => (
                <div className="stat-card" key={item.title}>
                  <div className={`stat-icon ${item.color}`}>
                    {item.icon}
                  </div>
                  <p>{item.title}</p>
                  <h2>{item.value}</h2>
                  <small>Live database records</small>
                </div>
              ))}
            </section>

            <section className="content-grid">
              <div className="panel visits-panel">
                <div className="panel-heading">
                  <div>
                    <h3>Recent Dispensary Visits</h3>
                    <p>Latest student health visits</p>
                  </div>
                  <span>{visits.length} Records</span>
                </div>

                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>VISIT ID</th>
                        <th>STUDENT</th>
                        <th>REASON</th>
                        <th>DATE & TIME</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>

                    <tbody>
                      {visits.length > 0 ? (
                        visits.slice(0, 5).map((visit) => (
                          <tr key={visit._id || visit.visitId}>
                            <td>{visit.visitId}</td>
                            <td>
                              <strong>
                                {visit.student?.name || "Unknown Student"}
                              </strong>
                              <small>
                                {visit.student?.department || "N/A"}
                              </small>
                            </td>
                            <td>{visit.reason || "N/A"}</td>
                            <td>{formatDate(visit.visitDate)}</td>
                            <td>
                              <span
                                className={`status ${
                                  visit.status === "Completed"
                                    ? "completed"
                                    : "progress"
                                }`}
                              >
                                {visit.status || "In Progress"}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5">
                            No dispensary visits found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="panel inventory-panel">
                <div className="panel-heading">
                  <div>
                    <h3>Inventory Overview</h3>
                    <p>Medicine stock status</p>
                  </div>
                  <span>💊</span>
                </div>

                <div className="inventory-number">
                  <h1>{totalStock}</h1>
                  <p>Total medicine units in stock</p>
                </div>

                <div className="stock-row">
                  <span>Available Medicine Types</span>
                  <strong>{availablePercentage}%</strong>
                </div>

                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${availablePercentage}%` }}
                  ></div>
                </div>

                <div className="alert-box">
                  <span>⚠️</span>
                  <div>
                    <strong>{lowStockCount} Low Stock Items</strong>
                    <p>Medicines requiring restocking.</p>
                  </div>
                </div>

                <button
                  className="manage-button"
                  onClick={() => navigate("/inventory")}
                >
                  Manage Inventory →
                </button>
              </div>
            </section>

            <section className="bottom-grid">
              <div className="panel activity-panel">
                <h3>Database Overview</h3>

                <div className="activity-item">
                  <span className="activity-dot blue-dot"></span>
                  <div>
                    <strong>{students.length} Student Records</strong>
                    <p>Student information stored in database</p>
                  </div>
                </div>

                <div className="activity-item">
                  <span className="activity-dot green-dot"></span>
                  <div>
                    <strong>{visits.length} Visit Records</strong>
                    <p>Dispensary visit records stored</p>
                  </div>
                </div>

                <div className="activity-item">
                  <span className="activity-dot orange-dot"></span>
                  <div>
                    <strong>{medicines.length} Medicine Records</strong>
                    <p>Medicine inventory records stored</p>
                  </div>
                </div>
              </div>

              <div className="panel quick-panel">
                <h3>Quick Actions</h3>
                <button onClick={() => navigate("/visits")}>
                  + Register New Visit
                </button>
                <button onClick={() => navigate("/students")}>
                  + Add Student Record
                </button>
                <button onClick={() => navigate("/inventory")}>
                  + Update Medicine Stock
                </button>
                <button onClick={() => navigate("/reports")}>
                  ▤ Generate Report
                </button>
              </div>
            </section>
          </>
        )}

        <footer>
          © 2026 CampusCare | College Dispensary Management System
        </footer>
      </main>
    </div>
  );
}

export default Dashboard;
