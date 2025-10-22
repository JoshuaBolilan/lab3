import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", age: "" });
  const [editId, setEditId] = useState(null);

  const API_URL = "http://localhost:5000/users";

  // Fetch users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get(API_URL);
    setUsers(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (editId) {
      await axios.put(`${API_URL}/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post(API_URL, form);
    }
    setForm({ name: "", email: "", age: "" });
    fetchUsers();
  };

  const handleEdit = (user) => {
    setForm(user);
    setEditId(user._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchUsers();
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4"> MERN CRUD Lab</h2>

      <div className="card p-3 shadow-sm mb-4">
        <h5>{editId ? "Update User" : "Add User"}</h5>
        <div className="row g-2">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              name="age"
              placeholder="Age"
              value={form.age}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3 d-grid">
            <button className="btn btn-primary" onClick={handleSubmit}>
              {editId ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div>

      <table className="table table-bordered text-center shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.age}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(u)}>
                  Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(u._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
