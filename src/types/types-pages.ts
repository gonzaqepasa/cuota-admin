import { typesUser } from "./types-user";

export interface typesPageWithUsers {
  users: typesUser[];
  page: number;
  totalPages: number;
  totalUsers: number;
}
