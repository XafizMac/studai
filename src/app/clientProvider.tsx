"use client";

import { createContext, ReactNode } from "react";
import Store from "@/store/store";

interface State {
  store: Store;
}

const store = new Store();

export const Context = createContext<State>({
  store,
});

const ClientProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Context.Provider value={{ store }}>
      {children}
    </Context.Provider>
  );
};

export default ClientProvider;
