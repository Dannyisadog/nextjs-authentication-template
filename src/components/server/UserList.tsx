import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { User } from "@prisma/client";
import PersonIcon from "@mui/icons-material/Person";

export default async function UserList() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const response = await fetch(`${apiUrl}/users`);

  const users: User[] = await response.json();

  return (
    <List>
      {users.map((user) => {
        return (
          <ListItem key={user.id}>
            <ListItemAvatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.name} secondary={user.email} />
          </ListItem>
        );
      })}
    </List>
  );
}
