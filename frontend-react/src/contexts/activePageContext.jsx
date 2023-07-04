import { createContext, useState } from "react";
const ActivePageContext = createContext();

const ActivePageContextProvider = ({ children }) => {
  const [activePage, setActivePage] = useState("Home");

  return (
    <ActivePageContext.Provider
      value={{
        activePage: activePage,
        setActivePage: setActivePage,
      }}
    >
      {children}
    </ActivePageContext.Provider>
  );
};

export { ActivePageContext, ActivePageContextProvider };
