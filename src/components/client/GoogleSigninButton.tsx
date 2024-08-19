"use client";

import { signIn } from "next-auth/react";

export default function GoogleSigninButton() {
  return (
    <button
      onClick={() => signIn("google")}
      style={{
        border: 0,
        marginTop: "1rem",
        padding: "0.5rem 1rem",
        backgroundColor: "#3888ff",
        color: "white",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "1.2rem",
      }}
    >
      Sign in with Google
    </button>
  );
}
