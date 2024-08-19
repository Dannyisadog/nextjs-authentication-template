"use client";
import { signOut } from "next-auth/react";

export default function SignoutButton() {
  return (
    <button
      onClick={() => {
        signOut();
      }}
      style={{
        marginTop: "1rem",
        padding: "0.5rem 1rem",
        backgroundColor: "white",
        color: "black",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "1.2rem",
        border: 0,
      }}
    >
      Sign out
    </button>
  );
}
