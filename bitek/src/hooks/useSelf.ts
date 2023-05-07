import type { Session, User } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type NextAuthStatus = "authenticated" | "unauthenticated" | "loading";
/**
 * A hook that returns the current user's data and status.
 *
 * @returns {Object} An object containing the current user's data and status.
 * @example
 * import { useSelf } from "~/hooks/useSelf";
 * const self = useSelf();
 * console.log(self.data); // { id: 1, name: "John Doe", ... }
 * console.log(self.status); // "authenticated"
 */
export function useSelf() {
  const [userData, setUserData] = useState<User | null>(null);
  const [userStatus, setUserStatus] =
    useState<NextAuthStatus>("unauthenticated");
  const session = useSession();
  useEffect(() => {
    if (session.data?.user !== undefined) {
      setUserData(session.data?.user);
    }
    setUserStatus(session.status);
  }, [session]);

  return { data: userData, status: userStatus };
}
