/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const initialData =
  localStorage.getItem("isAuth") != null
    ? localStorage.getItem("isAuth") == "true"
    : false;

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(initialData);

  const LoginHandler = () => setIsAuth(true);
  const LogoutHandler = () => {
    setIsAuth(false);
  };

  useEffect(() => {
    localStorage.setItem("isAuth", isAuth);
  }, [isAuth]);
  return (
    <AuthContext.Provider value={{ isAuth, LoginHandler, LogoutHandler }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
