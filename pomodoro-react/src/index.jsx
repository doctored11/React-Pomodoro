import * as React from "react";
import * as ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Page } from "./Page/Page.tsx";
import { Statistic } from "./Page/Statistic/Statistic.tsx";
import { Header } from "./Page/Header/Header.tsx";
import "./index.css";

// точка входа

const App = () => (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/stats" element={<Statistic />} />
      </Routes>
    </BrowserRouter>
  );

window.addEventListener("load", () => {
 
    const root = createRoot(document.getElementById("root")); root.render(
    <App />
    );
   
 
});
