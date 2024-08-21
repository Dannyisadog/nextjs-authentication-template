"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SigninForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  return (
    <form
      method="post"
      style={{
        display: "flex",
        flexDirection: "column",
      }}
      onSubmit={async (e) => {
        e.preventDefault();
        const result = await signIn("credentials", {
          callbackUrl: "/",
          email,
          password,
          redirect: false,
        });

        if (result?.error) {
          setError(result.error);
        }

        if (!result?.error) {
          router.push("/");
        }
      }}
    >
      {error && (
        <p
          style={{
            color: "#ff4545",
            fontSize: 12,
          }}
        >
          email or password is incorrect
        </p>
      )}
      <input
        type="email"
        name="email"
        placeholder="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button
        className="signin-button"
        style={{
          backgroundColor: "#191919",
        }}
      >
        Sign in
      </button>
    </form>
  );
}
