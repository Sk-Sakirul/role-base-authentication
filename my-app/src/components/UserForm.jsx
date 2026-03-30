"use client";

import { useState } from "react";

export default function UserForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  return (
    <div className="card">
      <h2>Create User</h2>

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
        type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button onClick={() => onSubmit(form)}>Create</button>
    </div>
  );
}
