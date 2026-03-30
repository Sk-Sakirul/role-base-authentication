"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // NEW: edit state
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const token = typeof window !== "undefined" && localStorage.getItem("token");

  // ================= FETCH DATA =================
  const fetchData = async () => {
    try {
      const userRes = await fetch("/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const taskRes = await fetch("/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userData = await userRes.json();
      const taskData = await taskRes.json();

      if (userData.success) setUser(userData.data[0]);
      if (taskData.success) setTasks(taskData.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= CREATE TASK =================
  const addTask = async () => {
    if (!title.trim()) return;

    await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title }),
    });

    setTitle("");
    fetchData();
  };

  // ================= TOGGLE TASK =================
  const toggleTask = async (task) => {
    await fetch(`/api/tasks/${task._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ completed: !task.completed }),
    });

    fetchData();
  };

  // ================= DELETE TASK =================
  const deleteTask = async (id) => {
    await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchData();
  };

  // ================= UPDATE TASK =================
  const updateTask = async (id) => {
    if (!editTitle.trim()) return;

    await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: editTitle }),
    });

    setEditingId(null);
    setEditTitle("");
    fetchData();
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <Sidebar role="user" />

        <div className="main">
          <h1>User Dashboard</h1>

          {/* ================= PROFILE ================= */}
          <div className="card">
            <h2>Profile</h2>
            <p>
              <b>Name:</b> {user?.name}
            </p>
            <p>
              <b>Email:</b> {user?.email}
            </p>
          </div>

          {/* ================= ADD TASK ================= */}
          <div className="card">
            <h2>Tasks</h2>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task"
            />

            <button onClick={addTask}>Add</button>
          </div>

          {/* ================= TASK LIST ================= */}
          <div className="card">
            {tasks.map((task) => (
              <div className="task" key={task._id}>
                {editingId === task._id ? (
                  <>
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />

                    <button onClick={() => updateTask(task._id)}>Save</button>

                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <span
                      onClick={() => toggleTask(task)}
                      className={task.completed ? "completed" : ""}
                    >
                      {task.title}
                    </span>

                    <div>
                      <button
                        onClick={() => {
                          setEditingId(task._id);
                          setEditTitle(task.title);
                        }}
                      >
                        Edit
                      </button>

                      <button onClick={() => deleteTask(task._id)}>
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
