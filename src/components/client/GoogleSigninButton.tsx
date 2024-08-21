"use client";

import { signIn } from "next-auth/react";

export default function GoogleSigninButton() {
  return (
    <button
      className="signin-button"
      style={{
        backgroundColor: "#4285F4",
      }}
      onClick={() => signIn("google")}
    >
      Sign in with Google
    </button>
  );
}
