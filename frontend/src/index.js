import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, useLocation } from "react-router-dom";
import "react-toastify/ReactToastify.css";

function AppWithHeader() {
  const location = useLocation();
  const currentPath = location.pathname;

  // Pages where the LifeLink header should be shown
  const noNavbarPages = [
    "/welcome",
    "/login",
    "/signup",
    "/requestBlood",
    "/forgotPassword", // Fixed Forget Password page path
  ];

  // Check if current path matches exactly OR starts with a dynamic route
  const showHeader =
    noNavbarPages.includes(currentPath) || currentPath.startsWith("/home/requestPage/");

  return (
    <>
      {/* Show LifeLink only if navbar is NOT present */}
      {showHeader && <div className="lifelink-header">LifeLink</div>}
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
