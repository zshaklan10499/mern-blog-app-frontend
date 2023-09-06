import { createContext, useState } from "react";

export const DataContext = createContext(null);

const DataProvider = (props) => {
  const [user, setUser] = useState({ username: "", userId: "" });
  const [authenticated, setAuthenticated] = useState(false);
  const [page, setPage] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const contextValues = {
    user,
    setUser,
    authenticated,
    setAuthenticated,
    page,
    setPage,
    isLoading,
    setIsLoading,
  };

  return (
    <DataContext.Provider value={contextValues}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataProvider;
