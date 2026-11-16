
import React, { useEffect, useState } from "react";
import API from "../services/api";

function Reports() {
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReports = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/reports");
      setReports(response.data.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to load reports. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const overview = reports?.overview || {};
  const inventory = reports?.inventory || {};
  const visits = reports?.visits || {};
  const emergencies = reports?.emergencies || {};
  const distributions = reports?.distributions || {};

  const totalVisits =
    (visits.completedVisits || 0) +
    (visits.pendingVisits || 0);

  const totalEmergencies =
    (emergencies.openEmergencies || 0) +
    (emergencies.resolvedEmergencies || 0) +
    (emergencies.referredEmergencies || 0);

  const getPercentage = (value, total) => {
    if (!total) return 0;
    return Math.round((value / total) * 100);
  };

  const StatCard = ({ title, value, icon, color }) => (
    <div style={styles.statCard}>
      <div style={{ ...styles.statIcon, background: color }}>
        {icon}
      </div>
      <p style={styles.statTitle}>{title}</p>
      <h2 style={styles.statValue}>{value ?? 0}</h2>
    </div>
  );

  const ProgressBar = ({ label, value, total, color }) => {
    const percentage = getPercentage(value || 0, total || 0);

    return (
      <div style={styles.progressItem}>
        <div style={styles.progressHeader}>
          <span>{label}</span>
          <strong>{value || 0} ({percentage}%)</strong>
        </div>

        <div style={styles.progressBackground}>
          <div
            style={{
              ...styles.progressFill,
              width: `${percentage}%`,
              background: color
            }}
          />
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div style={styles.page}>
        <p style={styles.message}>Loading Reports...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.page}>
        <h2>Reports & Analytics</h2>
        <p style={styles.error}>{error}</p>
        <button style={styles.refreshButton} onClick={fetchReports}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.heading}>Reports & Analytics</h1>
          <p style={styles.subtitle}>
            Monitor and analyze CampusCare activities.
          </p>
        </div>

        <div style={styles.headerButtons}>
          <button
            style={styles.refreshButton}
            onClick={fetchReports}
          >
            Refresh Reports
          </button>

          <button
            style={styles.backButton}
            onClick={() => window.location.href = "/dashboard"}
          >
            Back to Dashboard
          </button>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Overall Overview</h2>

        <div style={styles.statsGrid}>
          <StatCard
            title="Total Students"
            value={overview.totalStudents}
            icon="👨‍🎓"
            color="#dbeafe"
          />

          <StatCard
            title="Total Visits"
            value={overview.totalVisits}
            icon="🩺"
            color="#dcfce7"
          />

          <StatCard
            title="Total Medicines"
            value={overview.totalMedicines}
            icon="💊"
            color="#fef3c7"
          />

          <StatCard
            title="Total Distributions"
            value={overview.totalDistributions}
            icon="📦"
            color="#ede9fe"
          />

          <StatCard
            title="Emergency Records"
            value={overview.totalEmergencies}
            icon="🚨"
            color="#fee2e2"
          />
        </div>
      </div>

      <div style={styles.reportGrid}>
        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>Medicine Inventory Report</h2>

          <div style={styles.numberRow}>
            <span>Total Stock Units</span>
            <strong>{inventory.totalStockUnits || 0}</strong>
          </div>

          <ProgressBar
            label="Low Stock Items"
            value={inventory.lowStockItems}
            total={overview.totalMedicines}
            color="#f59e0b"
          />

          <ProgressBar
            label="Out of Stock Items"
            value={inventory.outOfStockItems}
            total={overview.totalMedicines}
            color="#ef4444"
          />
        </div>

        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>Visit Report</h2>

          <div style={styles.numberRow}>
            <span>Total Visits</span>
            <strong>{totalVisits}</strong>
          </div>

          <ProgressBar
            label="Completed Visits"
            value={visits.completedVisits}
            total={totalVisits}
            color="#16a34a"
          />

          <ProgressBar
            label="In Progress Visits"
            value={visits.pendingVisits}
            total={totalVisits}
            color="#f59e0b"
          />
        </div>

        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>Emergency Report</h2>

          <div style={styles.numberRow}>
            <span>Total Emergency Records</span>
            <strong>{totalEmergencies}</strong>
          </div>

          <ProgressBar
            label="Open"
            value={emergencies.openEmergencies}
            total={totalEmergencies}
            color="#ef4444"
          />

          <ProgressBar
            label="Resolved"
            value={emergencies.resolvedEmergencies}
            total={totalEmergencies}
            color="#16a34a"
          />

          <ProgressBar
            label="Referred"
            value={emergencies.referredEmergencies}
            total={totalEmergencies}
            color="#f59e0b"
          />
        </div>

        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>Distribution Report</h2>

          <div style={styles.distributionBox}>
            <p>Total Distribution Records</p>
            <h2>{overview.totalDistributions || 0}</h2>
          </div>

          <div style={styles.distributionBox}>
            <p>Total Quantity Distributed</p>
            <h2>{distributions.totalQuantityDistributed || 0}</h2>
          </div>
        </div>
      </div>

      <div style={styles.footer}>
        <p>
          CampusCare Reports & Analytics
        </p>
        <span>Data is retrieved from the live database.</span>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "30px",
    background: "#f3f6fb",
    color: "#1e293b",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "15px",
    marginBottom: "30px"
  },

  heading: {
    margin: 0,
    fontSize: "28px"
  },

  subtitle: {
    color: "#64748b",
    marginTop: "8px"
  },

  headerButtons: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px"
  },

  refreshButton: {
    padding: "11px 18px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "7px",
    cursor: "pointer"
  },

  backButton: {
    padding: "11px 18px",
    background: "#334155",
    color: "white",
    border: "none",
    borderRadius: "7px",
    cursor: "pointer"
  },

  section: {
    marginBottom: "25px"
  },

  sectionTitle: {
    fontSize: "19px",
    marginTop: 0,
    marginBottom: "20px"
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
    gap: "17px"
  },

  statCard: {
    background: "white",
    padding: "20px",
    borderRadius: "11px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
  },

  statIcon: {
    width: "43px",
    height: "43px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10px",
    fontSize: "22px"
  },

  statTitle: {
    color: "#64748b",
    fontSize: "14px",
    marginBottom: "8px"
  },

  statValue: {
    fontSize: "27px",
    margin: 0
  },

  reportGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
    gap: "20px"
  },

  card: {
    background: "white",
    padding: "23px",
    borderRadius: "11px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
  },

  numberRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 0",
    marginBottom: "12px",
    borderBottom: "1px solid #e2e8f0"
  },

  progressItem: {
    marginTop: "20px"
  },

  progressHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    fontSize: "13px",
    marginBottom: "9px"
  },

  progressBackground: {
    width: "100%",
    height: "9px",
    background: "#e2e8f0",
    borderRadius: "10px",
    overflow: "hidden"
  },

  progressFill: {
    height: "100%",
    borderRadius: "10px",
    transition: "width 0.3s ease"
  },

  distributionBox: {
    background: "#f8fafc",
    padding: "16px",
    borderRadius: "9px",
    marginBottom: "14px"
  },

  footer: {
    textAlign: "center",
    color: "#64748b",
    marginTop: "30px",
    padding: "15px"
  },

  message: {
    textAlign: "center",
    padding: "40px"
  },

  error: {
    color: "#dc2626",
    marginBottom: "15px"
  }
};

export default Reports;
