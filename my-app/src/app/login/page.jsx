"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("role", data.data.role);

      router.push("/dashboard");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="container">
      <div className="main">
        <div className="card">
          <h2>Login</h2>

          <input
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
}
