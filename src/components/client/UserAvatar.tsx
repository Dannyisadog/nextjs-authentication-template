"use client";

import { Box } from "@mui/material";
import multiavatar from "@multiavatar/multiavatar/esm";
import { User } from "next-auth";
import Image from "next/image";
import EditIcon from "@mui/icons-material/Edit";
import { useDisclosure } from "hooks/useDisclosure";
import { UploadAvatarDialog } from "./UploadAvatarDialog";
import { useProvider } from "providers/Provider";

const UserAvatar = () => {
  const { session } = useProvider();

  const { user } = session;

  const { isOpen, onClose, onOpen } = useDisclosure();

  if (!user) {
    return null;
  }

  const svgCode = multiavatar(user.email as string);

  return (
    <Box position="relative" width={64}>
      {!user.image && (
        <Box
          dangerouslySetInnerHTML={{ __html: svgCode }}
          width={64}
          height={64}
        />
      )}
      {user.image && (
        <Box width={64} height={64} borderRadius={100} overflow="hidden">
          <Image
            src={user.image}
            width={64}
            height={64}
            alt={`Avatar for ${user.name}`}
            style={{
              objectFit: "cover",
            }}
          />
        </Box>
      )}
      <Box
        sx={{
          width: 24,
          height: 24,
          borderRadius: 100,
          position: "absolute",
          bottom: 0,
          right: 0,
          cursor: "pointer",
          backgroundColor: "#333333aa",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={onOpen}
      >
        <EditIcon
          sx={{
            fontSize: 14,
            color: "white",
          }}
        />
      </Box>
      <UploadAvatarDialog open={isOpen} onClose={onClose} />
    </Box>
  );
};

export default UserAvatar;
