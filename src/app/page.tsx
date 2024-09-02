import SignoutButton from "components/client/SignoutButton";
import { auth, CustomSession } from "auth";
import { redirect } from "next/navigation";
import { Alert, AlertTitle, Stack, Typography } from "@mui/material";
import Title from "components/client/Title";
import UserList from "components/client/UserList";
import UserAvatar from "components/client/UserAvatar";
import Provider from "providers/Provider";

export default async function Home() {
  const session = (await auth()) as CustomSession;

  if (!session || !session.user || !session.user?.email) {
    redirect("/signin");
  }

  const emailVerified = !!session.authUser.emailVerified;

  return (
    <Provider session={session}>
      <Title text="Basic Info" />
      <UserAvatar />
      <Stack direction="row" spacing={2}>
        <Typography textAlign="center">Account:</Typography>
        <Typography textAlign="center">{session.authUser.email}</Typography>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography textAlign="center">Name:</Typography>
        <Typography textAlign="center">{session.authUser.name}</Typography>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography textAlign="center">Status:</Typography>
        <Typography textAlign="center">
          {emailVerified ? "Verified" : "Not Verified"}
        </Typography>
      </Stack>
      <SignoutButton />
      <Title text="Users" showGithub={false} />
      <UserList />
    </Provider>
  );
}
