import { Lucia } from "lucia";
import { User } from "@/api/utils/types";
import { adapter } from "@/api/database/database";

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (att) => {
    return {
      email: att.email,
      id: att.id,
      fullname: att.fullname,
      avatar: att.avatar,
    };
  },
});

// IMPORTANT!
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: User;
  }
}
