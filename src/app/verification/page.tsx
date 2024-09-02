import { CircularProgress, Stack } from "@mui/material";
import Title from "components/client/Title";
import Verify from "./Verify";
import { Suspense } from "react";

export default function VerificationPage() {
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
        <CircularProgress />
      </Stack>
      <Suspense fallback={<></>}>
        <Verify />
      </Suspense>
    </>
  );
}
