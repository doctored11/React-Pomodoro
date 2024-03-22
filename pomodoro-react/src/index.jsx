import * as React from "react";
import * as ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";

import { Page } from "./Page/Page.tsx";
import "./index.css"


// точка входа

window.addEventListener("load", () => {
    const root = createRoot(document.getElementById("root"));
    root.render(<Page />);
});
