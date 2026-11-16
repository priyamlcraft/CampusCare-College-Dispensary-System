
import React, { useEffect, useState } from "react";
import API from "../services/api";

const emptyForm = {
  studentId: "",
  name: "",
  department: "",
  semester: "",
  phone: "",
  email: "",
  address: "",
};

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await API.get("/students");
      setStudents(response.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load student records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
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

  const handleEdit = (student) => {
    setEditingId(student._id);
    setFormData({
      studentId: student.studentId || "",
      name: student.name || "",
      department: student.department || "",
      semester: student.semester ?? "",
      phone: student.phone || "",
      email: student.email || "",
      address: student.address || "",
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
        semester: Number(formData.semester),
      };

      if (editingId) {
        await API.put(`/students/${editingId}`, payload);
        alert("Student updated successfully!");
      } else {
        await API.post("/students", payload);
        alert("Student added successfully!");
      }

      setFormData(emptyForm);
      setEditingId(null);
      setShowForm(false);
      await fetchStudents();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        `Unable to ${editingId ? "update" : "add"} student. Please check the details.`
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmed) return;

    try {
      setError("");
      await API.delete(`/students/${id}`);
      if (editingId === id) {
        setShowForm(false);
        setEditingId(null);
        setFormData(emptyForm);
      }
      await fetchStudents();
      alert("Student deleted successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete student.");
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData(emptyForm);
    setError("");
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <p style={styles.breadcrumb}>Pages / Students</p>
          <h1 style={styles.heading}>Student Management</h1>
          <p style={styles.subtitle}>Manage college student records</p>
        </div>

        <button style={styles.addButton} onClick={showForm ? closeForm : openAddForm}>
          {showForm ? "Close Form" : "+ Add Student"}
        </button>
      </div>

      {error && <p style={styles.error}>{error}</p>}

      {showForm && (
        <form style={styles.form} onSubmit={handleSubmit}>
          <h2 style={styles.formTitle}>
            {editingId ? "Edit Student Details" : "Register New Student"}
          </h2>

          <div style={styles.formGrid}>
            <input style={styles.input} name="studentId" placeholder="Student ID *"
              value={formData.studentId} onChange={handleChange} required />

            <input style={styles.input} name="name" placeholder="Student Name *"
              value={formData.name} onChange={handleChange} required />

            <input style={styles.input} name="department" placeholder="Department *"
              value={formData.department} onChange={handleChange} required />

            <input style={styles.input} type="number" name="semester"
              placeholder="Semester *" min="1" value={formData.semester}
              onChange={handleChange} required />

            <input style={styles.input} name="phone" placeholder="Phone Number"
              value={formData.phone} onChange={handleChange} />

            <input style={styles.input} type="email" name="email"
              placeholder="Email Address" value={formData.email}
              onChange={handleChange} />

            <input style={{ ...styles.input, gridColumn: "1 / -1" }}
              name="address" placeholder="Address" value={formData.address}
              onChange={handleChange} />
          </div>

          <div style={styles.formActions}>
            <button style={styles.submitButton} type="submit" disabled={saving}>
              {saving ? "Saving..." : editingId ? "Update Student" : "Save Student"}
            </button>
            <button style={styles.cancelButton} type="button" onClick={closeForm}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <div style={styles.summary}>
        <div>
          <span style={styles.summaryLabel}>Total Students</span>
          <h2 style={styles.summaryNumber}>{students.length}</h2>
        </div>
        <span style={styles.summaryIcon}>🎓</span>
      </div>

      <div style={styles.tableCard}>
        <h2 style={styles.tableTitle}>Student Records</h2>

        {loading ? (
          <p style={styles.message}>Loading student records...</p>
        ) : students.length === 0 ? (
          <p style={styles.message}>No student records found. Add your first student.</p>
        ) : (
          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>STUDENT ID</th>
                  <th style={styles.th}>NAME</th>
                  <th style={styles.th}>DEPARTMENT</th>
                  <th style={styles.th}>SEMESTER</th>
                  <th style={styles.th}>PHONE</th>
                  <th style={styles.th}>STATUS</th>
                  <th style={styles.th}>ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {students.map((student) => (
                  <tr key={student._id}>
                    <td style={styles.td}>{student.studentId}</td>
                    <td style={styles.td}>{student.name}</td>
                    <td style={styles.td}>{student.department}</td>
                    <td style={styles.td}>{student.semester}</td>
                    <td style={styles.td}>{student.phone || "N/A"}</td>
                    <td style={styles.td}>
                      <span style={styles.status}>{student.status || "Active"}</span>
                    </td>
                    <td style={styles.td}>
                      <div style={styles.actionGroup}>
                        <button style={styles.editButton}
                          onClick={() => handleEdit(student)}>
                          Edit
                        </button>
                        <button style={styles.deleteButton}
                          onClick={() => handleDelete(student._id)}>
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
  breadcrumb: { color: "#64748b", fontSize: "13px", marginBottom: "8px" },
  heading: { fontSize: "27px", marginBottom: "6px" },
  subtitle: { color: "#64748b", fontSize: "14px" },
  addButton: {
    background: "#2563eb", color: "white", border: "none",
    borderRadius: "8px", padding: "12px 20px",
    cursor: "pointer", fontWeight: "600",
  },
  error: {
    background: "#fee2e2", color: "#b91c1c",
    padding: "12px", borderRadius: "8px", marginBottom: "18px",
  },
  form: {
    background: "white", padding: "24px", borderRadius: "12px",
    marginBottom: "25px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
  },
  formTitle: { fontSize: "19px", marginBottom: "18px" },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "14px",
  },
  input: {
    width: "100%", padding: "12px", border: "1px solid #dbe2ea",
    borderRadius: "7px", outline: "none", boxSizing: "border-box",
  },
  formActions: { display: "flex", gap: "10px", flexWrap: "wrap" },
  submitButton: {
    background: "#0f9f6e", color: "white", border: "none",
    borderRadius: "7px", padding: "12px 22px", marginTop: "18px",
    cursor: "pointer",
  },
  cancelButton: {
    background: "#e2e8f0", color: "#334155", border: "none",
    borderRadius: "7px", padding: "12px 22px", marginTop: "18px",
    cursor: "pointer",
  },
  summary: {
    background: "white", padding: "22px", borderRadius: "12px",
    display: "flex", justifyContent: "space-between",
    alignItems: "center", marginBottom: "25px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
  },
  summaryLabel: { color: "#64748b", fontSize: "14px" },
  summaryNumber: { fontSize: "30px", marginTop: "8px" },
  summaryIcon: { fontSize: "35px" },
  tableCard: {
    background: "white", padding: "22px", borderRadius: "12px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
  },
  tableTitle: { fontSize: "19px", marginBottom: "18px" },
  tableWrap: { width: "100%", overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", minWidth: "850px" },
  th: {
    textAlign: "left", padding: "13px", background: "#f8fafc",
    color: "#64748b", fontSize: "12px", borderBottom: "1px solid #e2e8f0",
  },
  td: { padding: "14px 13px", borderBottom: "1px solid #edf0f4", fontSize: "13px" },
  status: {
    background: "#dcfce7", color: "#15803d", padding: "5px 9px",
    borderRadius: "20px", fontSize: "12px",
  },
  actionGroup: { display: "flex", gap: "7px" },
  editButton: {
    background: "#dbeafe", color: "#1d4ed8", border: "none",
    padding: "7px 11px", borderRadius: "6px", cursor: "pointer",
  },
  deleteButton: {
    background: "#fee2e2", color: "#b91c1c", border: "none",
    padding: "7px 11px", borderRadius: "6px", cursor: "pointer",
  },
  message: { color: "#64748b", padding: "20px 0", textAlign: "center" },
};

export default Students;

