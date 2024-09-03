"use client";

import { Alert, Stack, Typography } from "@mui/material";
import TextField from "./TextField";
import { useState } from "react";
import Button from "./Button";

export default function SendForgotPasswordLinkForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        if (!email) {
          setError("email is required");
          return;
        }

        setLoading(true);

        const response = await fetch("/api/users/sendResetPasswordEmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        if (response.ok) {
          setError("");
          setLoading(false);
          setEmail("");
          setSuccess(true);
        } else {
          const data = await response.json();
          setError(data.message);
          setLoading(false);
        }
      }}
    >
      <Stack spacing={2}>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">Email sent</Alert>}
        <TextField
          fullWidth
          value={email}
          type="email"
          name="email"
          placeholder="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Button isLoading={loading} fullWidth type="submit" variant="contained">
          <Typography>Send Reset Password Link</Typography>
        </Button>
      </Stack>
    </form>
  );
}
