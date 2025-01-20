import { createContext, useContext, useEffect, useState } from "react";
import { useAppwrite } from "./UseAppwrite";
import { getCurrentUser } from "./AppWrite";

const GlobalContext = createContext(undefined);

export const GlobalProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState("GetStarted");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const {
  //   data: userDetails,
  //   user,
  //   loading,
  //   refetch,
  // } = useAppwrite({ fn: getCurrentUser });
  // // const [userDetails, setUserDetails] = useState(data);
  // const isLoggedIn = !!userDetails;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user = await getCurrentUser();
        setUserDetails(user);
        setIsLoggedIn(true);
        setInitialRoute(`${user.usertype}`);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setIsLoggedIn(false);
        setInitialRoute("GetStarted");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <GlobalContext.Provider
      value={{ userDetails, setUserDetails, loading, initialRoute, isLoggedIn }}
    >
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
