import React from "react";

const users = [
  { id: 1, name: "Mario Rossi", email: "mario@example.com" },
  { id: 2, name: "Luca Bianchi", email: "luca@example.com" },
];

function UserInfo() {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name} - {user.email}
        </li>
      ))}
    </ul>
  );
}

export default UserInfo;
