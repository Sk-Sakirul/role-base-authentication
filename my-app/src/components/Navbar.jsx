"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.push("/login");
  };

  return (
    <div
      style={{
        background: "#1e293b",
        color: "white",
        padding: "12px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h3>Dashboard</h3>
      <button
        onClick={logout}
        style={{
          background: "#ef4444",
          padding: "8px 12px",
          border: "none",
          color: "white",
          borderRadius: "4px",
        }}
      >
        Logout
      </button>
    </div>
  );
}
