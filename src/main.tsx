import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { Provider } from "./provider.tsx";
import "@/styles/globals.css";
import "leaflet/dist/leaflet.css";
import "leaflet.pm/dist/leaflet.pm.css";

const originalWarn = console.warn;

console.warn = (message, ...args) => {
  if (
    message.includes(
      "An aria-label or aria-labelledby prop is required for accessibility"
    )
  ) {
    return;
  }
  originalWarn(message, ...args);
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename="/bo">
    <Provider>
      <App />
    </Provider>
  </BrowserRouter>
);
