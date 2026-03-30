"use client";

import Link from "next/link";

export default function Sidebar({ role }) {
  return (
    <div className="sidebar">
      {/* <h2>Dashboard</h2> */}

      {role === "user" && (
        <>
          <Link href="/user/dashboard">Dashboard</Link>
        </>
      )}

      {role === "admin" && (
        <>
          <Link href="/admin/dashboard">Dashboard</Link>
          <Link href="/admin/users">Users</Link>
        </>
      )}

      {role === "superadmin" && (
        <>
          <Link href="/superadmin/dashboard">Dashboard</Link>
          <Link href="/superadmin/admins">Admins</Link>
        </>
      )}
    </div>
  );
}
