"use client";

import { signIn } from "next-auth/react";
import Button from "./Button";
import { Stack, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useState } from "react";

export default function GithubSigninButton() {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      isLoading={loading}
      fullWidth
      variant="outlined"
      onClick={async () => {
        setLoading(true);
        await signIn("github");
      }}
    >
      <Stack direction="row" spacing={1}>
        <GitHubIcon />
        <Typography>Sign in with Github</Typography>
      </Stack>
    </Button>
  );
}
