
import React from "react";

const stats = [
  { title: "Total Students", value: "1,250", icon: "👨‍🎓", color: "blue" },
  { title: "Today's Visits", value: "24", icon: "🩺", color: "green" },
  { title: "Medicines in Stock", value: "186", icon: "💊", color: "purple" },
  { title: "Low Stock Alerts", value: "08", icon: "⚠️", color: "orange" }
];

const visits = [
  { id: "VIS-1001", name: "Aarav Sharma", department: "CSE", reason: "Headache", time: "09:30 AM", status: "Completed" },
  { id: "VIS-1002", name: "Ananya Das", department: "IT", reason: "Fever", time: "10:15 AM", status: "In Progress" },
  { id: "VIS-1003", name: "Rahul Sen", department: "ECE", reason: "Minor Injury", time: "11:00 AM", status: "Completed" },
  { id: "VIS-1004", name: "Sneha Roy", department: "ME", reason: "Cold", time: "11:45 AM", status: "Completed" }
];

function App() {
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
          <a className="active" href="#dashboard">▦ Dashboard</a>
          <a href="#students">♙ Students</a>
          <a href="#visits">♡ Dispensary Visits</a>
          <a href="#inventory">▣ Medicine Inventory</a>
          <a href="#distribution">↗ Medicine Distribution</a>
          <a href="#emergency">✚ Emergency Register</a>
          <a href="#reports">▤ Reports & Analytics</a>
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
            <span className="today">📅 November 14, 2026</span>
            <span className="notification">🔔</span>
          </div>
        </header>

        <section className="welcome">
          <div>
            <p>WELCOME TO CAMPUSCARE</p>
            <h1>Your Campus Health,<br />Our Priority.</h1>
            <span>Manage dispensary activities and keep your campus healthy.</span>
          </div>
          <div className="welcome-icon">✚</div>
        </section>

        <section className="stats-grid">
          {stats.map((item) => (
            <div className="stat-card" key={item.title}>
              <div className={`stat-icon ${item.color}`}>{item.icon}</div>
              <p>{item.title}</p>
              <h2>{item.value}</h2>
              <small>Campus records overview</small>
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
              <button>View All →</button>
            </div>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>VISIT ID</th>
                    <th>STUDENT</th>
                    <th>REASON</th>
                    <th>TIME</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {visits.map((visit) => (
                    <tr key={visit.id}>
                      <td>{visit.id}</td>
                      <td>
                        <strong>{visit.name}</strong>
                        <small>{visit.department}</small>
                      </td>
                      <td>{visit.reason}</td>
                      <td>{visit.time}</td>
                      <td>
                        <span className={`status ${visit.status === "Completed" ? "completed" : "progress"}`}>
                          {visit.status}
                        </span>
                      </td>
                    </tr>
                  ))}
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
              <h1>186</h1>
              <p>Total medicines in stock</p>
            </div>

            <div className="stock-row">
              <span>Available Stock</span>
              <strong>78%</strong>
            </div>
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>

            <div className="alert-box">
              <span>⚠️</span>
              <div>
                <strong>08 Low Stock Items</strong>
                <p>Some medicines need restocking.</p>
              </div>
            </div>

            <button className="manage-button">Manage Inventory →</button>
          </div>
        </section>

        <section className="bottom-grid">
          <div className="panel activity-panel">
            <h3>Recent Activities</h3>
            <div className="activity-item">
              <span className="activity-dot blue-dot"></span>
              <div><strong>New student visit registered</strong><p>Student record added · 10 minutes ago</p></div>
            </div>
            <div className="activity-item">
              <span className="activity-dot green-dot"></span>
              <div><strong>Medicine stock updated</strong><p>Inventory quantity updated · 30 minutes ago</p></div>
            </div>
            <div className="activity-item">
              <span className="activity-dot orange-dot"></span>
              <div><strong>Low stock alert generated</strong><p>Inventory notification · 1 hour ago</p></div>
            </div>
          </div>

          <div className="panel quick-panel">
            <h3>Quick Actions</h3>
            <button>＋ Register New Visit</button>
            <button>＋ Add Student Record</button>
            <button>＋ Update Medicine Stock</button>
            <button>▤ Generate Report</button>
          </div>
        </section>

        <footer>
          © 2026 CampusCare | College Dispensary Management System
        </footer>
      </main>
    </div>
  );
}

export default App;
