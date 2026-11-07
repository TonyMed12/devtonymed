import { createContext, useContext } from "react";

export const EntranceReady = createContext(true);
export const useEntranceReady = () => useContext(EntranceReady);
