"use client";
import { signOut } from "next-auth/react";
import Button from "./Button";

export default function SignoutButton() {
  return (
    <Button
      variant="contained"
      onClick={() => {
        signOut();
      }}
    >
      Sign out
    </Button>
  );
}
