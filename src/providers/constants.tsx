import { Session, User } from "next-auth";

export interface ProviderContextType {
  session: Session;
  updateSession: () => void;
  users: User[];
  updateUsers: () => void;
}
