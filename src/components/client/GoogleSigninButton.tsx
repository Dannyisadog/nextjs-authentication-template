"use client";

import { signIn } from "next-auth/react";
import Button from "./Button";
import { Stack, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useState } from "react";

export default function GoogleSigninButton() {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      isLoading={loading}
      fullWidth
      variant="outlined"
      onClick={async () => {
        setLoading(true);
        await signIn("google");
      }}
    >
      <Stack direction="row" spacing={1}>
        <GoogleIcon />
        <Typography>Sign in with Google</Typography>
      </Stack>
    </Button>
  );
}
