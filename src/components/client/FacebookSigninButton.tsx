"use client";

import { signIn } from "next-auth/react";
import Button from "./Button";
import { Stack, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useState } from "react";

export default function FacebookSigninButton() {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      isLoading={loading}
      fullWidth
      variant="outlined"
      onClick={async () => {
        setLoading(true);
        await signIn("facebook");
      }}
    >
      <Stack direction="row" spacing={1}>
        <FacebookIcon />
        <Typography>Sign in with Facebook</Typography>
      </Stack>
    </Button>
  );
}
