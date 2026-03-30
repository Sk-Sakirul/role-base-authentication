"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const logout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <div
      style={{
        background: "#1e293b",
        color: "white",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <h3>My Dashboard</h3>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
