import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContext, AuthContextProvider } from "./contexts/authContext.jsx";
import {
  ActivePageContext,
  ActivePageContextProvider,
} from "./contexts/activePageContext.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <ActivePageContextProvider>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </ActivePageContextProvider>
  </AuthContextProvider>
);
