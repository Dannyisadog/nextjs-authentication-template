"use client";

import { Alert, CircularProgress, Stack } from "@mui/material";
import Title from "components/client/Title";
import Verify from "./Verify";
import { Suspense, useState } from "react";

export default function VerificationPage() {
  const [error, setError] = useState("");
  return (
    <>
      <Title text="Verifying..." />
      <Stack
        direction="row"
        justifyContent="center"
        sx={{
          pt: 4,
        }}
      >
        {!error && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}
      </Stack>
      <Suspense fallback={<></>}>
        <Verify setError={setError} />
      </Suspense>
    </>
  );
}
