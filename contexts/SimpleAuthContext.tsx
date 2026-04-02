"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

const AUTH_STORAGE_KEY = "cpu_mock_auth";

type MockUser = {
  id: string;
  name: string;
  email: string;
};

interface SimpleAuthContextType {
  user: MockUser | null;
  isAuthenticated: boolean;
  isReady: boolean;
  login: (user?: Partial<MockUser>) => void;
  logout: () => void;
}

const SimpleAuthContext = createContext<SimpleAuthContextType | undefined>(undefined);

export function SimpleAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(AUTH_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { isAuthenticated?: boolean; user?: MockUser };
        if (parsed?.isAuthenticated) {
          setUser(
            parsed.user || {
              id: "mock-user-1",
              name: "Utilisateur CPU",
              email: "utilisateur@cpu.local",
            }
          );
        }
      }
    } catch (error) {
      console.error("Erreur lecture auth locale:", error);
    } finally {
      setIsReady(true);
    }
  }, []);

  const login = (nextUser?: Partial<MockUser>) => {
    const mockUser: MockUser = {
      id: nextUser?.id || (typeof crypto !== "undefined" ? crypto.randomUUID() : `mock-${Date.now()}`),
      name: nextUser?.name || "Utilisateur CPU",
      email: nextUser?.email || "utilisateur@cpu.local",
    };
    setUser(mockUser);
    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({ isAuthenticated: true, user: mockUser })
    );
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isReady,
      login,
      logout,
    }),
    [user, isReady]
  );

  return <SimpleAuthContext.Provider value={value}>{children}</SimpleAuthContext.Provider>;
}

export function useSimpleAuth() {
  const context = useContext(SimpleAuthContext);
  if (!context) {
    throw new Error("useSimpleAuth doit être utilisé dans SimpleAuthProvider");
  }
  return context;
}
