import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { NotesProvider } from "./context/NotesProvider.tsx";
import { BrowserRouter } from "react-router-dom";
import { store } from "./context/store.tsx";
import { Provider } from "react-redux";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark">
      <NotesProvider>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </NotesProvider>
    </ThemeProvider>
  </StrictMode>
);
