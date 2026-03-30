"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import UserForm from "@/components/UserForm";
import UserList from "@/components/UserList";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  const token = typeof window !== "undefined" && localStorage.getItem("token");

  // ================= FETCH USERS =================
  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (data.success) setUsers(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ================= CREATE USER =================
  const createUser = async (form) => {
    await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    fetchUsers();
  };

  // ================= DELETE USER =================
  const deleteUser = async (id) => {
    await fetch(`/api/user/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchUsers();
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <Sidebar role="admin" />

        <div className="main">
          <h1>Admin Dashboard</h1>

          {/* Create User */}
          <UserForm onSubmit={createUser} />

          {/* User List */}
          <UserList users={users} onDelete={deleteUser} />
        </div>
      </div>
    </>
  );
}
