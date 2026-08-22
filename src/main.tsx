
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";

  // The canonical Builder entry point stays data-neutral during the UI phase.
  createRoot(document.getElementById("root")!).render(
    <App />
  );
