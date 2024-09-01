"use client";

import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import multiavatar from "@multiavatar/multiavatar/esm";
import { useProvider } from "providers/Provider";

export default function UserList() {
  const { users } = useProvider();

  return (
    <List>
      {users.map((user) => {
        const svgCode = multiavatar(user.email as string);
        return (
          <ListItem key={user.id}>
            <ListItemAvatar>
              {!user.image && (
                <Avatar>
                  <Box
                    dangerouslySetInnerHTML={{ __html: svgCode }}
                    width="100%"
                    height="100%"
                  />
                </Avatar>
              )}
              {user.image && <Avatar src={user.image} />}
            </ListItemAvatar>
            <ListItemText primary={user.name} secondary={user.email} />
          </ListItem>
        );
      })}
    </List>
  );
}
