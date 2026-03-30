"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function SuperAdminDashboard() {
  const [admins, setAdmins] = useState([]);

  const token = typeof window !== "undefined" && localStorage.getItem("token");

  // ================= FETCH ADMINS =================
  const fetchAdmins = async () => {
    try {
      const res = await fetch("/api/admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setAdmins(data.data);
      }
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container">
        <Sidebar role="superadmin" />

        <div className="main">
          <h1>Super Admin Dashboard</h1>

          {/* ===== STATS ===== */}
          <div className="card">
            <h3>Total Admins</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>
              {admins.length}
            </p>
          </div>

          {/* ===== RECENT ADMINS ===== */}
          <div className="card">
            <h3>Recent Admins</h3>

            {admins.length === 0 ? (
              <p>No admins found</p>
            ) : (
              admins.slice(0, 5).map((admin) => (
                <div key={admin._id} className="task">
                  <span>
                    {admin.name} - {admin.email}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* ===== QUICK ACTION ===== */}
          <div className="card">
            <h3>Quick Actions</h3>
            <p>👉 Go to "Admins" section to manage admins.</p>
          </div>
        </div>
      </div>
    </>
  );
}
