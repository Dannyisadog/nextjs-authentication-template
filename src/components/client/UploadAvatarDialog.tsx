import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  Input,
} from "@mui/material";
import Button from "./Button";
import { useProvider } from "providers/Provider";
import Image from "next/image";
import multiavatar from "@multiavatar/multiavatar/esm";
import { useRef, useState } from "react";

interface UploadAvatarDialogProps {
  open: boolean;
  onClose: () => void;
}

export const UploadAvatarDialog = (props: UploadAvatarDialogProps) => {
  const { open, onClose } = props;

  const { session, updateSession, updateUsers } = useProvider();
  const { user } = session;
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const imageRef = useRef(null);
  const [image, setImage] = useState<string>("");

  if (!user) {
    return null;
  }

  const close = () => {
    onClose();
    setTimeout(() => {
      setImage("");
      imageRef.current = null;
    }, 500);
  };

  const upload = async () => {
    if (!imageRef.current) {
      return;
    }

    const file = (imageRef.current as any).files[0];

    if (!file) {
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("/api/users/avatar", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setImage(data.url);

    setUploading(false);
  };

  const updateUserAvatar = async () => {
    setSaving(true);
    await fetch("/api/users/avatar", {
      method: "PUT",
      body: JSON.stringify({
        image,
      }),
    });
    setSaving(false);
    close();
    updateSession();
    updateUsers();
  };

  return (
    <Dialog
      open={open}
      onClose={close}
      sx={{
        p: 2,
      }}
    >
      {!image && (
        <>
          <DialogContent>
            {user.image && (
              <Image
                src={user.image}
                width={240}
                height={240}
                alt={`Avatar for ${user.name}`}
                style={{
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            )}
            {!user.image && (
              <Box
                dangerouslySetInnerHTML={{
                  __html: multiavatar(user.email as string),
                }}
                width={240}
                height={240}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={close}>Cancel</Button>
            <Button
              variant="contained"
              component="label"
              autoFocus
              isLoading={uploading}
            >
              Upload
              <input ref={imageRef} type="file" hidden onChange={upload} />
            </Button>
          </DialogActions>
        </>
      )}
      {image && (
        <>
          <DialogContent>
            <Image
              src={image}
              alt="New Avatar"
              width={240}
              height={240}
              style={{
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={close}>Cancel</Button>
            <Button
              variant="outlined"
              component="label"
              autoFocus
              isLoading={uploading}
            >
              Reselect
              <input ref={imageRef} type="file" hidden onChange={upload} />
            </Button>
            <Button
              variant="contained"
              onClick={updateUserAvatar}
              isLoading={saving}
            >
              Save
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};
