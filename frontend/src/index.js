import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, useLocation } from "react-router-dom";
import "react-toastify/ReactToastify.css";

function AppWithHeader() {
  const location = useLocation();

  // List of pages where the header should be visible
  const noNavbarPages = [
    "/welcome",
    "/login",
    "/signup",
    "/requestBlood",
    "/requestPage",
    "/details",
  ];

  return (
    <>
      {/* Show LifeLink only if navbar is NOT present */}
      {noNavbarPages.includes(location.pathname) && (
        <div className="lifelink-header">LifeLink</div>
      )}
      <App />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppWithHeader />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
