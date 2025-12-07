"use client";

import { createContext, useContext } from "react";

const SidebarContext = createContext({
  open: () => {},
  close: () => {},
  toggle: () => {},
});

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  return <SidebarContext.Provider value={{ open(){}, close(){}, toggle(){} }}>{children}</SidebarContext.Provider>;
};

export const useSidebar = () => useContext(SidebarContext);