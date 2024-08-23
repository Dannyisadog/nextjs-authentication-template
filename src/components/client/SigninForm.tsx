"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "./Button";
import TextField from "./TextField";
import { Stack, Typography } from "@mui/material";
import Link from "next/link";

export function SigninForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  return (
    <form
      method="post"
      onSubmit={async (e) => {
        setLoading(true);
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

        setLoading(false);
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
        <Stack direction="row" justifyContent="end">
          <Link href="/register">
            <Typography color="primary.dark">register</Typography>
          </Link>
        </Stack>
        <Button isLoading={loading} fullWidth type="submit" variant="contained">
          <Typography>Sign in</Typography>
        </Button>
      </Stack>
    </form>
  );
}
