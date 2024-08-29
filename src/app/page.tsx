import SignoutButton from "components/client/SignoutButton";
import { auth } from "auth";
import { redirect } from "next/navigation";
import { Box, Stack, Typography } from "@mui/material";
import Title from "components/client/Title";
import UserList from "components/client/UserList";
import multiavatar from "@multiavatar/multiavatar/esm";
import Image from "next/image";

export default async function Home() {
  const session = await auth();

  if (!session || !session.user?.email) {
    redirect("/signin");
  }

  const svgCode = multiavatar(session.user.email);

  return (
    <>
      <Title text="Basic Info" />
      {!session.user.image && (
        <Box
          dangerouslySetInnerHTML={{ __html: svgCode }}
          width={64}
          height={64}
        />
      )}
      {session.user.image && (
        <Image
          src={session.user.image}
          width={64}
          height={64}
          alt={`Avatar for ${session.user.name}`}
        />
      )}
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
