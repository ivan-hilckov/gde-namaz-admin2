import React, { createContext, useContext, useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";
import AuthLayout from "@/layouts/auth";
import axios from "axios";
import Cookies from "js-cookie";

interface AuthContextType {
  user: any;
  isChecked: boolean;
  signin: (
    username: string,
    password: string,
    callback: (hasError: boolean) => void
  ) => void;
  signout: (callback: VoidFunction) => void;
  checkLoginStatus: (callback?: VoidFunction) => void;
}

let AuthContext = createContext<AuthContextType>(null!);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  let [isChecked, setIsChecked] = useState<boolean>(false);
  let [user, setUser] = useState<any>(null);

  let checkLoginStatus = async (callback?: VoidFunction) => {
    return axios
      .get("/api/auth/me", {
        headers: {
          "X-Access-Token": Cookies.get("X-Access-Token"),
        },
      })
      .then((res) => {
        setUser(res.data);
        callback?.();
      })
      .catch(() => {
        setUser(null);
        callback?.();
      });
  };

  let signin = (
    username: string,
    password: string,
    callback: (hasError: boolean) => void
  ) => {
    return axios
      .post("/api/auth/login", {
        username,
        password,
      })
      .then((res) => {
        Cookies.set("X-Access-Token", res.data.token);
        setUser(res.data);
        callback?.(false);
      })
      .catch(() => {
        callback?.(true);
      });
  };

  let signout = (callback: VoidFunction) => {
    Cookies.remove("X-Access-Token");
    setUser(null);
    callback?.();
  };

  let value = { user, isChecked, checkLoginStatus, signin, signout };

  useEffect(() => {
    checkLoginStatus(() => {
      setIsChecked(true);
    });
  }, []);

  if (!isChecked) {
    return (
      <AuthLayout>
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <Spinner color="default" labelColor="foreground" size="lg" />
        </section>
      </AuthLayout>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
