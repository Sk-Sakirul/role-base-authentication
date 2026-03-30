"use client";

import Sidebar from "@/components/Sidebar";

export default function SuperAdminDashboard() {
  return (
    <div className="container">
      <Sidebar role="superadmin" />

      <div className="main">
        <h1>Super Admin Dashboard</h1>

        <div className="card">
          <h3>Welcome Super Admin</h3>
          <p>You can manage admins.</p>
        </div>
      </div>
    </div>
  );
}
