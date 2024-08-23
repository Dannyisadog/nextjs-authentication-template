"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "./Button";
import TextField from "./TextField";
import { Stack, Typography } from "@mui/material";

export function SigninForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  return (
    <form
      method="post"
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
      <Stack spacing={2}>
        {error && (
          <Typography color="#ff4545">email or password incorrect</Typography>
        )}
        <TextField
          fullWidth
          type="email"
          name="email"
          placeholder="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          fullWidth
          type="password"
          name="password"
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button fullWidth type="submit" variant="contained">
          <Typography>Sign in</Typography>
        </Button>
      </Stack>
    </form>
  );
}
