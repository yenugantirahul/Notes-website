import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { NotesProvider } from "./context/NotesProvider.tsx";
import { HashRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark">
      <NotesProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </NotesProvider>
    </ThemeProvider>
  </StrictMode>
);
