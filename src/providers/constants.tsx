import { CustomSession } from "auth";
import { User } from "next-auth";

export interface ProviderContextType {
  session: CustomSession;
  updateSession: () => void;
  users: User[];
  updateUsers: () => void;
}
