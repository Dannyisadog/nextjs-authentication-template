import SignoutButton from "components/client/SignoutButton";
import { auth } from "auth";
import { redirect } from "next/navigation";
import { Stack, Typography } from "@mui/material";
import Title from "components/client/Title";
import UserList from "components/client/UserList";
import UserAvatar from "components/client/UserAvatar";
import { put } from "@vercel/blob";
import Provider from "providers/Provider";

export default async function Home() {
  const session = await auth();

  if (!session || !session.user || !session.user?.email) {
    redirect("/signin");
  }

  return (
    <Provider session={session}>
      <Title text="Basic Info" />
      <UserAvatar />
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
    </Provider>
  );
}
