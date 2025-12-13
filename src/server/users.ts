import { getDb, users } from "@/db";
import { createServerFn } from "@tanstack/react-start";

// This function guarantees execution ONLY on the server
export const getUsers = createServerFn({ method: "GET" }).handler(async () => {
  const db = await getDb();
  const userList = await db.select().from(users);
  return userList;
});
