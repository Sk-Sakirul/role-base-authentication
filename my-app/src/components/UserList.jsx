export default function UserList({ users, onDelete }) {
  return (
    <div className="card">
      {users.map((u) => (
        <div key={u._id} className="task">
          <span>
            {u.name} - {u.email}
          </span>
          <button onClick={() => onDelete(u._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
