import SignoutButton from "@/components/client/SignoutButton";
import styles from "./page.module.css";
import { auth } from "@/auth";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  const users: User[] = await fetch("http://localhost:3000/api/users").then(
    (res) => res.json()
  );

  if (!session) {
    redirect("/signin");
  }

  return (
    <div className={styles.auth_container}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <p
          style={{
            marginTop: "1rem",
          }}
        >
          {session.user?.name}
        </p>
        <div>
          <SignoutButton />
        </div>
      </div>
      <table
        style={{
          marginLeft: 64,
        }}
      >
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
