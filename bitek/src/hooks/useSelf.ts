import type { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";

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
  const [userStatus, setUserStatus] = useState<NextAuthStatus | null>(null);
  const [userAccountType, setUserAccountType] = useState<string | null>(null);
  const session = useSession();
  const accountTypeQuery = api.user.getUserAccountTypeById.useQuery({
    id: session.data?.user.id ?? "",
  });
  useEffect(() => {
    if (session.data?.user !== undefined) {
      setUserData(session.data?.user);
      setUserAccountType(accountTypeQuery.data?.accountType ?? "user");
    }
    setUserStatus(session.status);
  }, [session, accountTypeQuery.data?.accountType]);

  return { data: userData, status: userStatus, accountType: userAccountType };
}
