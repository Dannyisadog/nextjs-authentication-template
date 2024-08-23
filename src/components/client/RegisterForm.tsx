"use client";

import { Alert, Box, Stack, Typography } from "@mui/material";
import TextField from "./TextField";
import Button from "./Button";
import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import Link from "next/link";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  return (
    <form
      onSubmit={async (e) => {
        setLoading(true);
        e.preventDefault();

        if (username.length < 3) {
          setError("Username must be at least 3 characters");
          setLoading(false);
          return;
        }

        if (!email.includes("@")) {
          setError("Invalid email");
          setLoading(false);
          return;
        }

        if (password.length < 8) {
          setError("Password must be at least 8 characters");
          setLoading(false);
          return;
        }

        if (password !== passwordConfirm) {
          setError("Passwords do not match");
          setLoading(false);
          return;
        }
        setError("");

        const result = await fetch(`/api/register`, {
          method: "POST",
          body: JSON.stringify({
            name: username,
            email,
            password,
            passwordConfirm,
          }),
        });

        setLoading(false);

        if (result.ok) {
          setSuccess(true);
          setUsername("");
          setEmail("");
          setPassword("");
          setPasswordConfirm("");
        } else {
          setError("Error creating account");
        }
      }}
    >
      <Stack spacing={2}>
        {error && <Alert severity="error">{error}</Alert>}
        {success && (
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            <Stack direction="row" spacing={0.5}>
              <Typography variant="body2">
                Account created successfully
              </Typography>
              <Box color="primary.dark">
                <Link href="/signin">/signin</Link>
              </Box>
            </Stack>
          </Alert>
        )}
        <TextField
          value={username}
          fullWidth
          type="text"
          name="username"
          placeholder="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <TextField
          value={email}
          fullWidth
          type="email"
          name="email"
          placeholder="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          value={password}
          fullWidth
          type="password"
          name="password"
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <TextField
          value={passwordConfirm}
          fullWidth
          type="password"
          name="password-confirm"
          placeholder="password-confirm"
          onChange={(e) => {
            setPasswordConfirm(e.target.value);
          }}
        />
        <Button isLoading={loading} fullWidth type="submit" variant="contained">
          <Typography>Register</Typography>
        </Button>
      </Stack>
    </form>
  );
}
