
import React, { useEffect, useState } from "react";
import API from "../services/api";

function Medicine() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    medicineName: "",
    category: "",
    batchNumber: "",
    quantity: "",
    unit: "Tablets",
    expiryDate: "",
    minimumStock: 10,
    supplier: "",
  };

  const [form, setForm] = useState(emptyForm);

  const getStatus = (medicine) => {
    const quantity = Number(medicine.quantity);
    const minimum = Number(medicine.minimumStock);

    if (quantity <= 0) return "Out of Stock";
    if (quantity <= minimum) return "Low Stock";
    return "Available";
  };

  const fetchMedicines = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/medicines");
      setMedicines(response.data.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to load medicine records."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const openAddForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const handleEdit = (medicine) => {
    setEditingId(medicine._id);

    setForm({
      medicineName: medicine.medicineName || "",
      category: medicine.category || "",
      batchNumber: medicine.batchNumber || "",
      quantity: medicine.quantity ?? "",
      unit: medicine.unit || "Tablets",
      expiryDate: medicine.expiryDate
        ? new Date(medicine.expiryDate).toISOString().slice(0, 10)
        : "",
      minimumStock: medicine.minimumStock ?? 10,
      supplier: medicine.supplier || "",
    });

    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const quantity = Number(form.quantity);
    const minimumStock = Number(form.minimumStock);

    const status =
      quantity <= 0
        ? "Out of Stock"
        : quantity <= minimumStock
        ? "Low Stock"
        : "Available";

    const payload = {
      ...form,
      quantity,
      minimumStock,
      status,
    };

    try {
      if (editingId) {
        await API.put(`/medicines/${editingId}`, payload);
        alert("Medicine updated successfully.");
      } else {
        await API.post("/medicines", payload);
        alert("Medicine added successfully.");
      }

      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);
      fetchMedicines();
    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Unable to save medicine."
      );
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this medicine record?"
    );

    if (!confirmed) return;

    try {
      await API.delete(`/medicines/${id}`);
      alert("Medicine deleted successfully.");
      fetchMedicines();
    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Unable to delete medicine."
      );
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const lowStockCount = medicines.filter(
    (medicine) => getStatus(medicine) === "Low Stock"
  ).length;

  const outOfStockCount = medicines.filter(
    (medicine) => getStatus(medicine) === "Out of Stock"
  ).length;

  const totalUnits = medicines.reduce(
    (total, medicine) =>
      total + Number(medicine.quantity || 0),
    0
  );

  const styles = {
    page: {
      padding: "30px",
      background: "#f5f7fb",
      minHeight: "100vh",
      fontFamily: "Arial, sans-serif",
      color: "#243047",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "15px",
      marginBottom: "25px",
    },
    button: {
      background: "#2563eb",
      color: "white",
      border: "none",
      padding: "12px 18px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
    },
    cards: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
      gap: "16px",
      marginBottom: "25px",
    },
    card: {
      background: "white",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    },
    panel: {
      background: "white",
      padding: "22px",
      borderRadius: "12px",
      overflowX: "auto",
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    },
    input: {
      width: "100%",
      padding: "11px",
      border: "1px solid #d7dce5",
      borderRadius: "7px",
      boxSizing: "border-box",
      marginTop: "7px",
    },
    label: {
      display: "block",
      fontWeight: "600",
      marginBottom: "15px",
      fontSize: "14px",
    },
    action: {
      border: "none",
      padding: "7px 11px",
      borderRadius: "6px",
      cursor: "pointer",
      marginRight: "6px",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={{ margin: 0 }}>Medicine Inventory</h1>
          <p style={{ color: "#64748b" }}>
            Manage medicine records and stock information
          </p>
        </div>

        <button style={styles.button} onClick={openAddForm}>
          + Add Medicine
        </button>
      </div>

      <section style={styles.cards}>
        <div style={styles.card}>
          <p>Total Medicines</p>
          <h2>{medicines.length}</h2>
        </div>

        <div style={styles.card}>
          <p>Total Stock Units</p>
          <h2>{totalUnits}</h2>
        </div>

        <div style={styles.card}>
          <p>Low Stock Items</p>
          <h2 style={{ color: "#d97706" }}>{lowStockCount}</h2>
        </div>

        <div style={styles.card}>
          <p>Out of Stock</p>
          <h2 style={{ color: "#dc2626" }}>{outOfStockCount}</h2>
        </div>
      </section>

      {error && (
        <p style={{ color: "#dc2626" }}>{error}</p>
      )}

      <section style={styles.panel}>
        <h2>Medicine Records</h2>

        {loading ? (
          <p>Loading medicine records...</p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "850px",
              textAlign: "left",
            }}
          >
            <thead>
              <tr style={{ background: "#f1f5f9" }}>
                {[
                  "MEDICINE",
                  "CATEGORY",
                  "BATCH NO.",
                  "QUANTITY",
                  "EXPIRY DATE",
                  "STATUS",
                  "ACTIONS",
                ].map((heading) => (
                  <th
                    key={heading}
                    style={{ padding: "13px", fontSize: "12px" }}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {medicines.length > 0 ? (
                medicines.map((medicine) => {
                  const status = getStatus(medicine);

                  return (
                    <tr key={medicine._id}>
                      <td style={{ padding: "13px" }}>
                        <strong>{medicine.medicineName}</strong>
                        <br />
                        <small>{medicine.supplier || "No supplier"}</small>
                      </td>

                      <td style={{ padding: "13px" }}>
                        {medicine.category}
                      </td>

                      <td style={{ padding: "13px" }}>
                        {medicine.batchNumber}
                      </td>

                      <td style={{ padding: "13px" }}>
                        {medicine.quantity} {medicine.unit}
                      </td>

                      <td style={{ padding: "13px" }}>
                        {new Date(medicine.expiryDate).toLocaleDateString("en-IN")}
                      </td>

                      <td style={{ padding: "13px" }}>
                        <span
                          style={{
                            padding: "5px 9px",
                            borderRadius: "20px",
                            fontSize: "12px",
                            background:
                              status === "Available"
                                ? "#dcfce7"
                                : status === "Low Stock"
                                ? "#fef3c7"
                                : "#fee2e2",
                            color:
                              status === "Available"
                                ? "#15803d"
                                : status === "Low Stock"
                                ? "#b45309"
                                : "#b91c1c",
                          }}
                        >
                          {status}
                        </span>
                      </td>

                      <td style={{ padding: "13px" }}>
                        <button
                          style={{
                            ...styles.action,
                            background: "#dbeafe",
                            color: "#1d4ed8",
                          }}
                          onClick={() => handleEdit(medicine)}
                        >
                          Edit
                        </button>

                        <button
                          style={{
                            ...styles.action,
                            background: "#fee2e2",
                            color: "#b91c1c",
                          }}
                          onClick={() => handleDelete(medicine._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    style={{ padding: "25px", textAlign: "center" }}
                  >
                    No medicine records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </section>

      {showForm && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15,23,42,0.55)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "15px",
            zIndex: 1000,
            overflowY: "auto",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "12px",
              width: "100%",
              maxWidth: "650px",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <h2>
              {editingId ? "Edit Medicine" : "Add New Medicine"}
            </h2>

            <label style={styles.label}>
              Medicine Name *
              <input
                style={styles.input}
                name="medicineName"
                value={form.medicineName}
                onChange={handleChange}
                required
              />
            </label>

            <label style={styles.label}>
              Category *
              <input
                style={styles.input}
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="e.g. General"
                required
              />
            </label>

            <label style={styles.label}>
              Batch Number *
              <input
                style={styles.input}
                name="batchNumber"
                value={form.batchNumber}
                onChange={handleChange}
                required
              />
            </label>

            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "15px",
            }}>
              <label style={styles.label}>
                Quantity *
                <input
                  style={styles.input}
                  type="number"
                  name="quantity"
                  min="0"
                  value={form.quantity}
                  onChange={handleChange}
                  required
                />
              </label>

              <label style={styles.label}>
                Unit
                <select
                  style={styles.input}
                  name="unit"
                  value={form.unit}
                  onChange={handleChange}
                >
                  <option>Tablets</option>
                  <option>Capsules</option>
                  <option>Bottles</option>
                  <option>Strips</option>
                  <option>Packets</option>
                  <option>Units</option>
                </select>
              </label>
            </div>

            <label style={styles.label}>
              Expiry Date *
              <input
                style={styles.input}
                type="date"
                name="expiryDate"
                value={form.expiryDate}
                onChange={handleChange}
                required
              />
            </label>

            <label style={styles.label}>
              Minimum Stock
              <input
                style={styles.input}
                type="number"
                name="minimumStock"
                min="0"
                value={form.minimumStock}
                onChange={handleChange}
              />
            </label>

            <label style={styles.label}>
              Supplier
              <input
                style={styles.input}
                name="supplier"
                value={form.supplier}
                onChange={handleChange}
              />
            </label>

            <div style={{
              display: "flex",
              gap: "10px",
              justifyContent: "flex-end",
            }}>
              <button
                type="button"
                onClick={closeForm}
                style={{
                  ...styles.button,
                  background: "#64748b",
                }}
              >
                Cancel
              </button>

              <button type="submit" style={styles.button}>
                {editingId ? "Update Medicine" : "Save Medicine"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Medicine;
