"use client";
import { signOut } from "next-auth/react";
import Button from "./Button";
import { useState } from "react";

export default function SignoutButton() {
  const [loading, setLoading] = useState(false);
  return (
    <Button
      isLoading={loading}
      variant="contained"
      onClick={() => {
        setLoading(true);
        signOut();
      }}
    >
      Sign out
    </Button>
  );
}
