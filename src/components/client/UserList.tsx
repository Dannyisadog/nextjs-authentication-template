"use client";

import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { User } from "@prisma/client";
import PersonIcon from "@mui/icons-material/Person";
import { useEffect, useState } from "react";

export default function UserList() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [users, setUsers] = useState<User[]>([]);

  const getUsers = async () => {
    const response = await fetch(`${apiUrl}/users`);
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <List>
      {users.map((user) => {
        return (
          <ListItem key={user.id}>
            <ListItemAvatar>
              {!user.image && (
                <Avatar>
                  <PersonIcon />
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
