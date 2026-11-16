
import React, { useEffect, useState } from "react";
import API from "../services/api";

function Emergency() {
  const [emergencies, setEmergencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const initialForm = {
    emergencyId: "",
    personName: "",
    studentId: "",
    department: "",
    emergencyType: "General",
    description: "",
    actionTaken: "",
    referredTo: "",
    emergencyDate: new Date().toISOString().slice(0, 10),
    status: "Open"
  };

  const [form, setForm] = useState(initialForm);

  const fetchEmergencies = async () => {
    try {
      const response = await API.get("/emergencies");
      setEmergencies(response.data.data || []);
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Unable to load emergency records"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmergencies();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await API.put(`/emergencies/${editingId}`, form);
        alert("Emergency record updated successfully");
      } else {
        await API.post("/emergencies", form);
        alert("Emergency record added successfully");
      }

      resetForm();
      fetchEmergencies();
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Unable to save emergency record"
      );
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);

    setForm({
      emergencyId: item.emergencyId || "",
      personName: item.personName || "",
      studentId: item.studentId || "",
      department: item.department || "",
      emergencyType: item.emergencyType || "General",
      description: item.description || "",
      actionTaken: item.actionTaken || "",
      referredTo: item.referredTo || "",
      emergencyDate: item.emergencyDate
        ? new Date(item.emergencyDate).toISOString().slice(0, 10)
        : "",
      status: item.status || "Open"
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) {
      return;
    }

    try {
      await API.delete(`/emergencies/${id}`);
      alert("Emergency record deleted successfully");
      fetchEmergencies();
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Unable to delete record"
      );
    }
  };

  const filteredEmergencies = emergencies.filter((item) =>
    [
      item.emergencyId,
      item.personName,
      item.studentId,
      item.department,
      item.emergencyType,
      item.status
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const getStatusColor = (status) => {
    if (status === "Resolved") return "#15803d";
    if (status === "Referred") return "#b45309";
    return "#dc2626";
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.heading}>Emergency Register</h1>
          <p style={styles.subtitle}>
            Record and manage campus emergency incidents.
          </p>
        </div>

        <button
          style={styles.backButton}
          onClick={() => window.location.href = "/dashboard"}
        >
          Back to Dashboard
        </button>
      </div>

      <div style={styles.stats}>
        <div style={styles.statCard}>
          <p>Total Records</p>
          <h2>{emergencies.length}</h2>
        </div>

        <div style={styles.statCard}>
          <p>Open</p>
          <h2>
            {emergencies.filter((e) => e.status === "Open").length}
          </h2>
        </div>

        <div style={styles.statCard}>
          <p>Resolved</p>
          <h2>
            {emergencies.filter((e) => e.status === "Resolved").length}
          </h2>
        </div>

        <div style={styles.statCard}>
          <p>Referred</p>
          <h2>
            {emergencies.filter((e) => e.status === "Referred").length}
          </h2>
        </div>
      </div>

      <div style={styles.card}>
        <h2 style={styles.cardHeading}>
          {editingId ? "Edit Emergency Record" : "Add Emergency Record"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={styles.formGrid}>
            <div>
              <label style={styles.label}>Emergency ID *</label>
              <input
                style={styles.input}
                name="emergencyId"
                value={form.emergencyId}
                onChange={handleChange}
                placeholder="Example: EMG001"
                required
              />
            </div>

            <div>
              <label style={styles.label}>Person Name *</label>
              <input
                style={styles.input}
                name="personName"
                value={form.personName}
                onChange={handleChange}
                placeholder="Enter name"
                required
              />
            </div>

            <div>
              <label style={styles.label}>Student ID</label>
              <input
                style={styles.input}
                name="studentId"
                value={form.studentId}
                onChange={handleChange}
                placeholder="Enter student ID"
              />
            </div>

            <div>
              <label style={styles.label}>Department</label>
              <input
                style={styles.input}
                name="department"
                value={form.department}
                onChange={handleChange}
                placeholder="Enter department"
              />
            </div>

            <div>
              <label style={styles.label}>Emergency Type *</label>
              <select
                style={styles.input}
                name="emergencyType"
                value={form.emergencyType}
                onChange={handleChange}
                required
              >
                <option value="General">General</option>
                <option value="Accident">Accident</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label style={styles.label}>Emergency Date</label>
              <input
                style={styles.input}
                type="date"
                name="emergencyDate"
                value={form.emergencyDate}
                onChange={handleChange}
              />
            </div>

            <div>
              <label style={styles.label}>Status</label>
              <select
                style={styles.input}
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="Open">Open</option>
                <option value="Resolved">Resolved</option>
                <option value="Referred">Referred</option>
              </select>
            </div>

            <div>
              <label style={styles.label}>Referred To</label>
              <input
                style={styles.input}
                name="referredTo"
                value={form.referredTo}
                onChange={handleChange}
                placeholder="Enter referral destination"
              />
            </div>

            <div style={styles.fullWidth}>
              <label style={styles.label}>Description *</label>
              <textarea
                style={styles.textarea}
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter a brief incident description"
                required
              />
            </div>

            <div style={styles.fullWidth}>
              <label style={styles.label}>Action Taken</label>
              <textarea
                style={styles.textarea}
                name="actionTaken"
                value={form.actionTaken}
                onChange={handleChange}
                placeholder="Enter a brief administrative action record"
              />
            </div>
          </div>

          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.primaryButton}>
              {editingId ? "Update Record" : "Add Record"}
            </button>

            {editingId && (
              <button
                type="button"
                style={styles.cancelButton}
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div style={styles.card}>
        <div style={styles.listHeader}>
          <h2 style={styles.cardHeading}>Emergency Records</h2>

          <input
            style={styles.search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search records..."
          />
        </div>

        {loading ? (
          <p>Loading records...</p>
        ) : filteredEmergencies.length === 0 ? (
          <p style={styles.empty}>
            No emergency records found.
          </p>
        ) : (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Emergency ID</th>
                  <th style={styles.th}>Person</th>
                  <th style={styles.th}>Type</th>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredEmergencies.map((item) => (
                  <tr key={item._id}>
                    <td style={styles.td}>{item.emergencyId}</td>
                    <td style={styles.td}>{item.personName}</td>
                    <td style={styles.td}>{item.emergencyType}</td>
                    <td style={styles.td}>
                      {new Date(item.emergencyDate).toLocaleDateString()}
                    </td>
                    <td style={styles.td}>
                      <span
                        style={{
                          ...styles.status,
                          backgroundColor: getStatusColor(item.status)
                        }}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <button
                        style={styles.editButton}
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>

                      <button
                        style={styles.deleteButton}
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f3f6fb",
    padding: "30px",
    fontFamily: "Arial, sans-serif",
    color: "#1e293b"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "15px",
    marginBottom: "25px"
  },
  heading: {
    margin: 0,
    fontSize: "28px"
  },
  subtitle: {
    color: "#64748b",
    marginTop: "8px"
  },
  backButton: {
    padding: "11px 18px",
    background: "#334155",
    color: "white",
    border: "none",
    borderRadius: "7px",
    cursor: "pointer"
  },
  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
    gap: "16px",
    marginBottom: "22px"
  },
  statCard: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
  },
  card: {
    background: "white",
    padding: "24px",
    borderRadius: "12px",
    marginBottom: "22px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
  },
  cardHeading: {
    marginTop: 0,
    marginBottom: "20px",
    fontSize: "20px"
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "18px"
  },
  fullWidth: {
    gridColumn: "1 / -1"
  },
  label: {
    display: "block",
    marginBottom: "7px",
    fontWeight: "600",
    fontSize: "14px"
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "11px",
    border: "1px solid #cbd5e1",
    borderRadius: "7px",
    outline: "none"
  },
  textarea: {
    width: "100%",
    minHeight: "85px",
    boxSizing: "border-box",
    padding: "11px",
    border: "1px solid #cbd5e1",
    borderRadius: "7px",
    resize: "vertical",
    fontFamily: "Arial, sans-serif"
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
    marginTop: "20px"
  },
  primaryButton: {
    padding: "11px 20px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "7px",
    cursor: "pointer"
  },
  cancelButton: {
    padding: "11px 20px",
    background: "#64748b",
    color: "white",
    border: "none",
    borderRadius: "7px",
    cursor: "pointer"
  },
  listHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "12px"
  },
  search: {
    padding: "10px",
    border: "1px solid #cbd5e1",
    borderRadius: "7px",
    minWidth: "220px"
  },
  tableWrapper: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "700px"
  },
  th: {
    textAlign: "left",
    padding: "13px",
    background: "#f1f5f9",
    borderBottom: "1px solid #e2e8f0"
  },
  td: {
    padding: "13px",
    borderBottom: "1px solid #e2e8f0",
    fontSize: "14px"
  },
  status: {
    color: "white",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "12px"
  },
  editButton: {
    padding: "7px 11px",
    background: "#0f766e",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "6px"
  },
  deleteButton: {
    padding: "7px 11px",
    background: "#dc2626",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  empty: {
    color: "#64748b",
    padding: "20px 0"
  }
};

export default Emergency;
