import { createContext, useContext, ReactNode } from "react";
import { Session } from "@supabase/supabase-js";

const SessionContext = createContext<Session | null>(null);

export const useSession = () => {
    const session = useContext(SessionContext);
    if (session === undefined) {
        throw new Error("useSession must be used within a SessionProvider");
    }
    return session;
};

export const SessionProvider = ({
    children,
    session,
}: {
    children: ReactNode;
    session: Session | null;
}) => {
    return (
        <SessionContext.Provider value={session}>
            {children}
        </SessionContext.Provider>
    );
};
