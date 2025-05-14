import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useLocation } from "react-router-dom";

function Studentmark() {
  const location = useLocation();
  const { studentId = "", name = "" } = location.state || {};

  const [student, setStudent] = useState([]);
  const [formData, setFormData] = useState({
    studentId,
    name,
    subject1: "",
    subject2: "",
    subject3: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  
  const fetchData = () => {
    axios
      .get("http://92.205.109.210:8051/api/getallmark")
      .then((res) => {
        setStudent(res.data.data || []);
      })
      .catch((err) => console.error("Error fetching student marks:", err));
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      studentId,
      name,
      subject1: "",
      subject2: "",
      subject3: "",
    });
    setIsEditing(false);
  };


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const apiUrl = isEditing
      ? `http://92.205.109.210:8051/api/updatemark/${formData.studentId}`
      : "http://92.205.109.210:8051/api/addmark";

    axios
      .post(apiUrl, formData)
      .then((res) => {
        alert(res.data.message || "Success");
        fetchData();
        resetForm();
      })
      .catch((err) => {
        console.error("Error submitting form:", err);
        alert("Something went wrong.");
      });
  };


  const handleEdit = (row) => {
    setIsEditing(true);
    setFormData({ ...row });
  };


  const handleDelete = (row) => {
    const id = row?.studentId;

    if (!id) {
      alert("Student ID missing. Cannot delete.");
      console.error("Missing studentId in row:", row);
      return;
    }

    if (window.confirm(`Are you sure you want to delete ${row.name}?`)) {
      axios
        .delete(`http://92.205.109.210:8051/api/removemark/${id}`)
        .then((res) => {
          alert(res.data.message || "Deleted successfully");
          fetchData();
        })
        .catch((err) => {
          console.error("Error deleting student:", err);
          alert("Failed to delete student.");
        });
    }
  };

  const columns = [
    { name: "Student ID", selector: (row) => row.studentId, sortable: true },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Subject 1", selector: (row) => row.subject1, sortable: true },
    { name: "Subject 2", selector: (row) => row.subject2 },
    { name: "Subject 3", selector: (row) => row.subject3 },
    {
      name: "Edit",
      cell: (row) => (
        <button onClick={() => handleEdit(row)}>Edit</button>
      ),
    },
    {
      name: "Delete",
      cell: (row) => (
        <button onClick={() => handleDelete(row)}>Delete</button>
      ),
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="student-mark-container">
      <h2 className="form-header">Student Marks</h2>

      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <input
            name="studentId"
            placeholder="Student ID"
            value={formData.studentId}
            readOnly
          />
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            readOnly
          />
          <input
            name="subject1"
            placeholder="Subject 1"
            value={formData.subject1}
            onChange={handleChange}
            required
          />
          <input
            name="subject2"
            placeholder="Subject 2"
            value={formData.subject2}
            onChange={handleChange}
            required
          />
          <input
            name="subject3"
            placeholder="Subject 3"
            value={formData.subject3}
            onChange={handleChange}
            required
          />
          <button type="submit">{isEditing ? "Update" : "Submit"}</button>
          {isEditing && (
            <button type="button" onClick={resetForm}>
              Cancel
            </button>
          )}
        </form>
      </div>

      <div className="table-wrapper">
        <DataTable
          columns={columns}
          data={student}
          pagination
          highlightOnHover
          noDataComponent="No student marks found"
        />
      </div>
    </div>
  );
}

export default Studentmark;
