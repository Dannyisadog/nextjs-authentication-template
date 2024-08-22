"use client";

import { signIn } from "next-auth/react";
import Button from "./Button";
import { Typography } from "@mui/material";

export default function GoogleSigninButton() {
  return (
    <Button fullWidth variant="outlined" onClick={() => signIn("google")}>
      <Typography>Sign in with Google</Typography>
    </Button>
  );
}
