"use client";

import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");

  return (
    <div className="card">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
      />
      <button
        onClick={() => {
          onAdd(title);
          setTitle("");
        }}
      >
        Add Task
      </button>
    </div>
  );
}
