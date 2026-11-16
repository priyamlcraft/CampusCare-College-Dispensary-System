
import React, { useEffect, useState } from "react";
import API from "../services/api";

const today = () => {
  const date = new Date();
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60000)
    .toISOString()
    .slice(0, 10);
};

const emptyForm = {
  visitId: "",
  student: "",
  visitDate: today(),
  reason: "",
  symptoms: "",
  remarks: "",
  status: "In Progress",
};

function Visits() {
  const [visits, setVisits] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [visitResponse, studentResponse] = await Promise.all([
        API.get("/visits"),
        API.get("/students"),
      ]);

      setVisits(visitResponse.data.data || []);
      setStudents(studentResponse.data.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to load visit records."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const openAddForm = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setError("");
    setShowForm(true);
  };

  const handleEdit = (visit) => {
    setEditingId(visit._id);

    setFormData({
      visitId: visit.visitId || "",
      student: visit.student?._id || "",
      visitDate: visit.visitDate
        ? new Date(visit.visitDate).toLocaleDateString("en-CA")
        : today(),
      reason: visit.reason || "",
      symptoms: visit.symptoms || "",
      remarks: visit.remarks || "",
      status: visit.status || "In Progress",
    });

    setError("");
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      const payload = {
        ...formData,
        visitDate: new Date(formData.visitDate).toISOString(),
      };

      if (editingId) {
        await API.put(`/visits/${editingId}`, payload);
        alert("Visit updated successfully!");
      } else {
        await API.post("/visits", payload);
        alert("Visit recorded successfully!");
      }

      setFormData({ ...emptyForm, visitDate: today() });
      setEditingId(null);
      setShowForm(false);
      await fetchData();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        `Unable to ${editingId ? "update" : "save"} visit record.`
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this visit record?"
    );

    if (!confirmed) return;

    try {
      setError("");
      await API.delete(`/visits/${id}`);

      if (editingId === id) {
        closeForm();
      }

      await fetchData();
      alert("Visit deleted successfully!");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to delete visit record."
      );
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ ...emptyForm, visitDate: today() });
    setError("");
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <p style={styles.breadcrumb}>Pages / Visits</p>
          <h1 style={styles.heading}>Visit Management</h1>
          <p style={styles.subtitle}>
            Record and manage student dispensary visits
          </p>
        </div>

        <button
          style={styles.addButton}
          onClick={showForm ? closeForm : openAddForm}
        >
          {showForm ? "Close Form" : "+ Record Visit"}
        </button>
      </div>

      {error && <p style={styles.error}>{error}</p>}

      {showForm && (
        <form style={styles.form} onSubmit={handleSubmit}>
          <h2 style={styles.formTitle}>
            {editingId ? "Edit Visit Details" : "Record New Visit"}
          </h2>

          {students.length === 0 ? (
            <p style={styles.error}>
              No students found. Please add a student first.
            </p>
          ) : (
            <div style={styles.formGrid}>
              <input
                style={styles.input}
                name="visitId"
                placeholder="Visit ID * (e.g. VIS001)"
                value={formData.visitId}
                onChange={handleChange}
                required
              />

              <select
                style={styles.input}
                name="student"
                value={formData.student}
                onChange={handleChange}
                required
              >
                <option value="">Select Student *</option>
                {students.map((student) => (
                  <option key={student._id} value={student._id}>
                    {student.studentId} - {student.name}
                  </option>
                ))}
              </select>

              <input
                style={styles.input}
                type="date"
                name="visitDate"
                value={formData.visitDate}
                onChange={handleChange}
                required
              />

              <input
                style={styles.input}
                name="reason"
                placeholder="Reason for Visit *"
                value={formData.reason}
                onChange={handleChange}
                required
              />

              <input
                style={styles.input}
                name="symptoms"
                placeholder="Symptoms"
                value={formData.symptoms}
                onChange={handleChange}
              />

              <select
                style={styles.input}
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>

              <textarea
                style={styles.textarea}
                name="remarks"
                placeholder="Remarks / Additional Notes"
                value={formData.remarks}
                onChange={handleChange}
              />
            </div>
          )}

          <div style={styles.formActions}>
            <button
              style={styles.submitButton}
              type="submit"
              disabled={saving || students.length === 0}
            >
              {saving
                ? "Saving..."
                : editingId
                ? "Update Visit"
                : "Save Visit"}
            </button>

            <button
              style={styles.cancelButton}
              type="button"
              onClick={closeForm}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div style={styles.summary}>
        <div>
          <span style={styles.summaryLabel}>Total Visits</span>
          <h2 style={styles.summaryNumber}>{visits.length}</h2>
        </div>
        <span style={styles.summaryIcon}>🩺</span>
      </div>

      <div style={styles.tableCard}>
        <h2 style={styles.tableTitle}>Visit Records</h2>

        {loading ? (
          <p style={styles.message}>Loading visit records...</p>
        ) : visits.length === 0 ? (
          <p style={styles.message}>
            No visit records found. Record your first visit.
          </p>
        ) : (
          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>VISIT ID</th>
                  <th style={styles.th}>STUDENT</th>
                  <th style={styles.th}>DATE</th>
                  <th style={styles.th}>REASON</th>
                  <th style={styles.th}>SYMPTOMS</th>
                  <th style={styles.th}>STATUS</th>
                  <th style={styles.th}>ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {visits.map((visit) => (
                  <tr key={visit._id}>
                    <td style={styles.td}>{visit.visitId}</td>
                    <td style={styles.td}>
                      {visit.student?.name || "Unknown"}
                      <br />
                      <span style={styles.studentId}>
                        {visit.student?.studentId || ""}
                      </span>
                    </td>
                    <td style={styles.td}>
                      {visit.visitDate
                        ? new Date(visit.visitDate).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td style={styles.td}>{visit.reason}</td>
                    <td style={styles.td}>{visit.symptoms || "N/A"}</td>
                    <td style={styles.td}>
                      <span
                        style={
                          visit.status === "Completed"
                            ? styles.completed
                            : styles.inProgress
                        }
                      >
                        {visit.status || "In Progress"}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <div style={styles.actionGroup}>
                        <button
                          style={styles.editButton}
                          onClick={() => handleEdit(visit)}
                        >
                          Edit
                        </button>

                        <button
                          style={styles.deleteButton}
                          onClick={() => handleDelete(visit._id)}
                        >
                          Delete
                        </button>
                      </div>
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
    padding: "30px",
    minHeight: "100vh",
    background: "#f4f7fb",
    color: "#17243a",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    flexWrap: "wrap",
    marginBottom: "25px",
  },
  breadcrumb: {
    color: "#64748b",
    fontSize: "13px",
    marginBottom: "8px",
  },
  heading: { fontSize: "27px", marginBottom: "6px" },
  subtitle: { color: "#64748b", fontSize: "14px" },
  addButton: {
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "12px 20px",
    cursor: "pointer",
    fontWeight: "600",
  },
  error: {
    background: "#fee2e2",
    color: "#b91c1c",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "18px",
  },
  form: {
    background: "white",
    padding: "24px",
    borderRadius: "12px",
    marginBottom: "25px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
  },
  formTitle: { fontSize: "19px", marginBottom: "18px" },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "14px",
  },
  input: {
    width: "100%",
    padding: "12px",
    border: "1px solid #dbe2ea",
    borderRadius: "7px",
    outline: "none",
    boxSizing: "border-box",
    background: "white",
  },
  textarea: {
    width: "100%",
    minHeight: "85px",
    padding: "12px",
    border: "1px solid #dbe2ea",
    borderRadius: "7px",
    outline: "none",
    boxSizing: "border-box",
    gridColumn: "1 / -1",
    fontFamily: "Arial, sans-serif",
    resize: "vertical",
  },
  formActions: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  submitButton: {
    background: "#0f9f6e",
    color: "white",
    border: "none",
    borderRadius: "7px",
    padding: "12px 22px",
    marginTop: "18px",
    cursor: "pointer",
  },
  cancelButton: {
    background: "#e2e8f0",
    color: "#334155",
    border: "none",
    borderRadius: "7px",
    padding: "12px 22px",
    marginTop: "18px",
    cursor: "pointer",
  },
  summary: {
    background: "white",
    padding: "22px",
    borderRadius: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
  },
  summaryLabel: { color: "#64748b", fontSize: "14px" },
  summaryNumber: { fontSize: "30px", marginTop: "8px" },
  summaryIcon: { fontSize: "35px" },
  tableCard: {
    background: "white",
    padding: "22px",
    borderRadius: "12px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
  },
  tableTitle: { fontSize: "19px", marginBottom: "18px" },
  tableWrap: { width: "100%", overflowX: "auto" },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "1050px",
  },
  th: {
    textAlign: "left",
    padding: "13px",
    background: "#f8fafc",
    color: "#64748b",
    fontSize: "12px",
    borderBottom: "1px solid #e2e8f0",
  },
  td: {
    padding: "14px 13px",
    borderBottom: "1px solid #edf0f4",
    fontSize: "13px",
  },
  studentId: { color: "#64748b", fontSize: "11px" },
  completed: {
    background: "#dcfce7",
    color: "#15803d",
    padding: "5px 9px",
    borderRadius: "20px",
    fontSize: "12px",
  },
  inProgress: {
    background: "#fef3c7",
    color: "#92400e",
    padding: "5px 9px",
    borderRadius: "20px",
    fontSize: "12px",
  },
  actionGroup: { display: "flex", gap: "7px" },
  editButton: {
    background: "#dbeafe",
    color: "#1d4ed8",
    border: "none",
    padding: "7px 11px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  deleteButton: {
    background: "#fee2e2",
    color: "#b91c1c",
    border: "none",
    padding: "7px 11px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  message: {
    color: "#64748b",
    padding: "20px 0",
    textAlign: "center",
  },
};

export default Visits;
