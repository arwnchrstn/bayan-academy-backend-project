import React, { createContext, useReducer } from "react";
import { reducer } from "../reducer/reducer";
import { LocalStorage as ls } from "ttl-localstorage";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const user = ls.get("user-backend-project");
  const [state, dispatch] = useReducer(reducer, { user: user });

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
