import SignoutButton from "components/client/SignoutButton";
import { auth } from "auth";
import { redirect } from "next/navigation";
import { Box, Stack, Typography } from "@mui/material";
import Title from "components/client/Title";
import UserList from "components/client/UserList";
import Image from "next/image";
import UserAvatar from "components/client/UserAvatar";

export default async function Home() {
  const session = await auth();

  if (!session || !session.user || !session.user?.email) {
    redirect("/signin");
  }

  return (
    <>
      <Title text="Basic Info" />
      <UserAvatar user={session.user} />
      <Stack direction="row" spacing={2}>
        <Typography textAlign="center">Account:</Typography>
        <Typography textAlign="center">{session.user?.email}</Typography>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography textAlign="center">Name:</Typography>
        <Typography textAlign="center">{session.user?.name}</Typography>
      </Stack>
      <SignoutButton />
      <Title text="Users" showGithub={false} />
      <UserList />
    </>
  );
}
