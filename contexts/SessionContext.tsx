import { useContext, createContext } from "react";
export const SessionContext = createContext<Session | null>(null);