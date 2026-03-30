"use client";

import { useState } from "react";

export default function AdminForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  return (
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

      <button onClick={() => onSubmit(form)}>Create Admin</button>
    </div>
  );
}
