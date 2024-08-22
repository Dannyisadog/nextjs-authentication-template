import SignoutButton from "components/client/SignoutButton";
import { auth } from "auth";
import { redirect } from "next/navigation";
import { Stack, Typography } from "@mui/material";

export default async function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const session = await auth();
  const users = await fetch(`${apiUrl}/users`).then((res) => res.json());

  if (!session) {
    redirect("/signin");
  }

  return (
    <Stack
      height="100vh"
      justifyContent="center"
      margin="auto"
      maxWidth={400}
      spacing={2}
      px={2}
    >
      <Typography variant="h5">Basic Info</Typography>
      <Stack direction="row" spacing={2}>
        <Typography textAlign="center">Account:</Typography>
        <Typography textAlign="center">{session.user?.email}</Typography>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography textAlign="center">Name:</Typography>
        <Typography textAlign="center">{session.user?.name}</Typography>
      </Stack>
      <SignoutButton />
    </Stack>
  );
}
