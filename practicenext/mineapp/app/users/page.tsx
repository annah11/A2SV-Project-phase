import React from "react";
interface User {
  id: number;
  name: string;
}
const UsersPage = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-store",
  });
  const Users: User[] = await res.json();

  return (
    <>
      <h1> Users</h1>
      <p>{new Date().toLocaleTimeString()} </p>
      <ul>
        {Users.map((user) => (
          <li key={user.id}>
            <h2>{user.name}</h2>
            <p>ID: {user.id}</p>
          </li>
        ))}
      </ul> 
    </>
  );
};

export default UsersPage;
