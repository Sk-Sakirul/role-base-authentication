"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const token = typeof window !== "undefined" && localStorage.getItem("token");

  const fetchUsers = async () => {
    const res = await fetch("/api/user", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    if (data.success) setUsers(data.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const createUser = async () => {
    await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    setForm({ name: "", email: "", phone: "", password: "" });
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await fetch(`/api/user/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchUsers();
  };

  return (
    <div className="container">
      <Sidebar role="admin" />

      <div className="main">
        <h1>Manage Users</h1>

        <div className="card">
          <input
            placeholder="Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            placeholder="Phone"
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <input
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button onClick={createUser}>Create</button>
        </div>

        <div className="card">
          {users.map((u) => (
            <div key={u._id} className="task">
              <span>
                {u.name} - {u.email}
              </span>
              <button onClick={() => deleteUser(u._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
