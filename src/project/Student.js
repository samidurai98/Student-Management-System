import axios from "axios";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";

function Student1() {
  const nav = useNavigate();
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    rollno: "",
    year: "",
    gender: "",
    department: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  async function fetchData() {
    setLoading(true);
    try {
      const res = await axios.get("http://92.205.109.210:8051/api/getall");
      setDetails(res.data.data || []);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing) {
        await axios.post(
          `http://92.205.109.210:8051/api/update/${formData.studentId}`,
          formData
        );
        alert("Student updated successfully!");
      } else {
        await axios.post("http://92.205.109.210:8051/api/create", formData);
        alert("Student added successfully!");
      }
      fetchData();
      resetForm();
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setFormData({
      name: "",
      studentId: "",
      rollno: "",
      year: "",
      gender: "",
      department: "",
    });
    setIsEditing(false);
  }

  async function handleDelete(row) {
    if (window.confirm(`Are you sure you want to delete ${row.name}?`)) {
      setLoading(true);
      try {
        await axios.post(
          `http://92.205.109.210:8051/api/delete/${row.studentId}`
        );
        alert("Student deleted successfully!");
        fetchData();
      } catch (err) {
        console.error("Error deleting student:", err);
      } finally {
        setLoading(false);
      }
    }
  }

  function handleAddMark(student) {
    nav("/Studentmark", {
      state: { studentId: student.studentId, name: student.name },
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      name: "NAME",
      selector: (row) => row.name,
      sortable: true,
      cell: (row) => <div className="student-name">{row.name}</div>,
    },
    {
      name: "ROLL NO",
      selector: (row) => row.rollno,
      sortable: true,
    },
    {
      name: "YEAR",
      selector: (row) => row.year,
      sortable: true,
    },
    {
      name: "GENDER",
      selector: (row) => row.gender,
      sortable: true,
      cell: (row) => (
        <span className={`gender-badge ${row.gender ? row.gender.toLowerCase() : ""}`}>
          {row.gender || "N/A"}
        </span>
      ),
    },
    {
      name: "DEPARTMENT",
      selector: (row) => row.department,
      sortable: true,
      cell: (row) => (
        <span className="department-badge">
          {(row.department || "").toUpperCase()}
        </span>
      ),
    },
    {
      name: "ACTIONS",
      cell: (row) => (
        <div className="action-buttons">
          <button className="action-btn edit-btn" onClick={() => handleEdit(row)} title="Edit">
            <i className="fas fa-edit"></i>
          </button>
          <button className="action-btn delete-btn" onClick={() => handleDelete(row)} title="Delete">
            <i className="fas fa-trash-alt"></i>
          </button>
          <button className="action-btn mark-btn" onClick={() => handleAddMark(row)} title="Add Marks">
            <i className="fas fa-plus-circle"></i>
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  function handleLogout() {
    nav("/Logex");
  }

  function handleEdit(row) {
    setIsEditing(true);
    setFormData({ ...row });
  }

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#4a6fdc",
        color: "white",
        fontWeight: "bold",
        fontSize: "14px",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
      },
    },
    cells: {
      style: {
        padding: "15px",
        fontSize: "14px",
      },
    },
    rows: {
      style: {
        "&:hover": {
          backgroundColor: "#f8faff",
        },
      },
    },
  };

  return (
    <div className="student-management-app">
      <div className="app-header">
        <h1>
          <i className="fas fa-user-graduate"></i> Student Management System
        </h1>
      </div>

      <div className="app-container">
        <div className="form-section">
          <div className="form-card">
            <h2 className="form-title">
              {isEditing ? "Edit Student" : "Add New Student"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name</label>
                  <input name="name" placeholder="Enter full name" value={formData.name} onChange={handleChange} required/>
                </div>

                <div className="form-group">
                  <label>Roll Number</label>
                  <input name="rollno" placeholder="Enter roll number" value={formData.rollno} onChange={handleChange} required/>
                </div>

                <div className="form-group">
                  <label>Year</label>
                  <input name="year" placeholder="Enter year" value={formData.year} onChange={handleChange} required/>
                </div>

                <div className="form-group">
                  <label>Gender</label>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleChange}require/>
                      <span className="radio-custom"></span>
                      Male
                    </label>
                    <label className="radio-label">
                      <input type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleChange} required/>
                      <span className="radio-custom"></span>
                      Female
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label>Department</label>
                  <select name="department" value={formData.department} onChange={handleChange} required>
                    <option value="">Select Department</option>
                    <option value="bcs">BCS</option>
                    <option value="B.com">B.Com</option>
                    <option value="msc">MSc</option>
                    <option value="mcom">M.Com</option>
                  </select>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn" disabled={loading}>
                   {loading ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : isEditing ? (
                    "Update Student"
                  ) : (
                    "Add Student"
                  )}
                </button>
                <button type="button" className="refresh-btn" onClick={fetchData} disabled={loading}>
                  <i className="fas fa-sync-alt"></i> Refresh
                </button>
                {isEditing && (
                  <button type="button" className="cancel-btn" onClick={resetForm} disabled={loading}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="table-section">
          <div className="table-card">
            <div className="table-header">
              <h2>Student Records</h2>
              <div className="table-controls">
                <div className="search-box">
                  <i className="fas fa-search"></i>
                  <input type="text" placeholder="Search students..." />
                </div>
              </div>
            </div>
            <DataTable
              columns={columns}
              data={details}
              pagination
              paginationPerPage={10}
              paginationRowsPerPageOptions={[5, 10, 15, 20]}
              progressPending={loading}
              progressComponent={
                <div className="loader">
                  <i className="fas fa-spinner fa-spin"></i> Loading...
                </div>
              }
              noDataComponent={
                <div className="no-data">
                  <i className="fas fa-database"></i> No student records found
                </div>
              }
              highlightOnHover
              customStyles={customStyles}
              responsive
              striped
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Student1;
