"use client"; // 👈 this tells Next.js this is a client component

import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Users from Backend:</h1>
      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name} ({u.email})</li>
        ))}
      </ul>
    </main>
  );
}
