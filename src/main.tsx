import { createRoot } from "react-dom/client";

import App from "./app/App.tsx";
import "lenis/dist/lenis.css";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(<App />);
