
import React, { useEffect, useState } from "react";
import API from "../services/api";

function Distribution() {
  const [distributions, setDistributions] = useState([]);
  const [students, setStudents] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const emptyForm = {
    distributionId: "",
    student: "",
    medicine: "",
    visit: "",
    quantity: "",
    distributedAt: new Date().toISOString().slice(0, 10),
    remarks: ""
  };

  const [form, setForm] = useState(emptyForm);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [distributionRes, studentRes, medicineRes, visitRes] =
        await Promise.all([
          API.get("/distributions"),
          API.get("/students"),
          API.get("/medicines"),
          API.get("/visits")
        ]);

      setDistributions(distributionRes.data.data || []);
      setStudents(studentRes.data.data || []);
      setMedicines(medicineRes.data.data || []);
      setVisits(visitRes.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      await API.post("/distributions", {
        ...form,
        quantity: Number(form.quantity),
        visit: form.visit || undefined
      });

      setForm(emptyForm);
      setShowForm(false);
      await fetchData();
      alert("Distribution recorded successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to record distribution.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this distribution record?")) return;

    try {
      await API.delete(`/distributions/${id}`);
      await fetchData();
      alert("Distribution record deleted.");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete record.");
    }
  };

  const cardStyle = {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
  };

  const inputStyle = {
    width: "100%",
    padding: "11px",
    border: "1px solid #d1d5db",
    borderRadius: "7px",
    marginTop: "6px",
    boxSizing: "border-box"
  };

  const buttonStyle = {
    padding: "10px 16px",
    border: "none",
    borderRadius: "7px",
    cursor: "pointer",
    background: "#2563eb",
    color: "white",
    fontWeight: "600"
  };

  return (
    <div style={{
      padding: "30px",
      background: "#f4f7fb",
      minHeight: "100vh",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "12px"
      }}>
        <div>
          <h1 style={{ marginBottom: "6px", color: "#172554" }}>
            Medicine Distribution
          </h1>
          <p style={{ color: "#64748b" }}>
            Record and manage medicine distribution
          </p>
        </div>

        <button
          style={buttonStyle}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close Form" : "+ Record Distribution"}
        </button>
      </div>

      {error && (
        <p style={{
          color: "#b91c1c",
          background: "#fee2e2",
          padding: "12px",
          borderRadius: "7px"
        }}>
          {error}
        </p>
      )}

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "16px",
        margin: "25px 0"
      }}>
        <div style={cardStyle}>
          <p>Total Records</p>
          <h2>{distributions.length}</h2>
        </div>

        <div style={cardStyle}>
          <p>Total Units Distributed</p>
          <h2>
            {distributions.reduce((sum, item) => sum + Number(item.quantity || 0), 0)}
          </h2>
        </div>

        <div style={cardStyle}>
          <p>Students Served</p>
          <h2>
            {new Set(distributions.map(item => item.student?._id).filter(Boolean)).size}
          </h2>
        </div>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          style={{
            ...cardStyle,
            marginBottom: "25px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px"
          }}
        >
          <div>
            <label>Distribution ID *</label>
            <input
              name="distributionId"
              value={form.distributionId}
              onChange={handleChange}
              style={inputStyle}
              placeholder="DIST001"
              required
            />
          </div>

          <div>
            <label>Student *</label>
            <select
              name="student"
              value={form.student}
              onChange={handleChange}
              style={inputStyle}
              required
            >
              <option value="">Select Student</option>
              {students.map(student => (
                <option key={student._id} value={student._id}>
                  {student.studentId} - {student.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Medicine *</label>
            <select
              name="medicine"
              value={form.medicine}
              onChange={handleChange}
              style={inputStyle}
              required
            >
              <option value="">Select Medicine</option>
              {medicines.map(medicine => (
                <option key={medicine._id} value={medicine._id}>
                  {medicine.medicineName} (Stock: {medicine.quantity})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Visit (Optional)</label>
            <select
              name="visit"
              value={form.visit}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">No Visit Linked</option>
              {visits.map(visit => (
                <option key={visit._id} value={visit._id}>
                  {visit.visitId}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Quantity *</label>
            <input
              type="number"
              name="quantity"
              min="1"
              value={form.quantity}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>

          <div>
            <label>Distribution Date *</label>
            <input
              type="date"
              name="distributedAt"
              value={form.distributedAt}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <label>Remarks</label>
            <textarea
              name="remarks"
              value={form.remarks}
              onChange={handleChange}
              style={{ ...inputStyle, minHeight: "75px" }}
              placeholder="Enter remarks"
            />
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <button type="submit" style={buttonStyle}>
              Save Distribution
            </button>
          </div>
        </form>
      )}

      <div style={{ ...cardStyle, overflowX: "auto" }}>
        <h2>Distribution Records</h2>

        {loading ? (
          <p>Loading records...</p>
        ) : (
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "750px"
          }}>
            <thead>
              <tr style={{ background: "#eff6ff", textAlign: "left" }}>
                {[
                  "DISTRIBUTION ID",
                  "STUDENT",
                  "MEDICINE",
                  "QUANTITY",
                  "DATE",
                  "REMARKS",
                  "ACTIONS"
                ].map(title => (
                  <th key={title} style={{ padding: "13px" }}>{title}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {distributions.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ padding: "20px", textAlign: "center" }}>
                    No distribution records found.
                  </td>
                </tr>
              ) : (
                distributions.map(item => (
                  <tr key={item._id}>
                    <td style={{ padding: "13px" }}>{item.distributionId}</td>
                    <td style={{ padding: "13px" }}>
                      {item.student?.name || "Unknown"}
                    </td>
                    <td style={{ padding: "13px" }}>
                      {item.medicine?.medicineName || "Unknown"}
                    </td>
                    <td style={{ padding: "13px" }}>{item.quantity}</td>
                    <td style={{ padding: "13px" }}>
                      {item.distributedAt
                        ? new Date(item.distributedAt).toLocaleDateString()
                        : "-"}
                    </td>
                    <td style={{ padding: "13px" }}>{item.remarks || "-"}</td>
                    <td style={{ padding: "13px" }}>
                      <button
                        onClick={() => handleDelete(item._id)}
                        style={{
                          ...buttonStyle,
                          background: "#dc2626"
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Distribution;
