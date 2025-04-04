import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useClientSession = (initialSession: Session | null) => {
  const { data: session, status } = useSession();
  const [currentSession, setCurrentSession] = useState<Session | null>(
    initialSession
  );

  useEffect(() => {
    if (session) return setCurrentSession(session);
  }, [session]);

  useEffect(() => {
    if (initialSession) return setCurrentSession(initialSession);
  }, [initialSession]);

  return {
    data: currentSession,
    status,
  };
};
