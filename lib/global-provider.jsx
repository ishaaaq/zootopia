import { createContext, useContext } from "react";
import { useAppwrite } from "./UseAppwrite";
import { getCurrentUser } from "./AppWrite";

const GlobalContext = createContext(undefined);

export const GlobalProvider = ({ children }) => {
  const {
    data: userDetails,
    user,
    loading,
    refetch,
  } = useAppwrite({ fn: getCurrentUser });

  const isLoggedIn = !!userDetails;

  return (
    <GlobalContext.Provider value={{ isLoggedIn, userDetails, user, loading }}>
      {children}
    </GlobalContext.Provider>
  );
};

export function useGlobalContext() {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("Use global context must be used in a global provider");
  }
  return context;
}
