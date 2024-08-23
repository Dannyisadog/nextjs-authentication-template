import SignoutButton from "components/client/SignoutButton";
import { auth } from "auth";
import { redirect } from "next/navigation";
import { Stack, Typography } from "@mui/material";
import Title from "components/client/Title";
import UserList from "components/server/UserList";

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }

  return (
    <>
      <Title text="Basic Info" />
      <Stack direction="row" spacing={2}>
        <Typography textAlign="center">Account:</Typography>
        <Typography textAlign="center">{session.user?.email}</Typography>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography textAlign="center">Name:</Typography>
        <Typography textAlign="center">{session.user?.name}</Typography>
      </Stack>
      <Title text="Users" showGithub={false} />
      <UserList />
      <SignoutButton />
    </>
  );
}
