// src/context/AuthContext.tsx
import React, { createContext, useContext, ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { User } from "../features/user/userSlice";


interface AuthContextType {
  currentUser: User | null;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const isAdmin = currentUser?.role === "admin";
    
  return (
    <AuthContext.Provider value={{ currentUser, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
