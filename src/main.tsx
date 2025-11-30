import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

if (!import.meta.env.VITE_METEOSOURCE_API_KEY) {
  createRoot(document.getElementById("root")!).render(
    <div style={{ padding: "20px", fontFamily: "sans-serif", color: "red" }}>
      <h1>Configuration Error</h1>
      <p>
        The environment variable <code>VITE_METEOSOURCE_API_KEY</code> is missing.
      </p>
      <p>
        Please create a <code>.env</code> file in the root of your project and add your API key:
      </p>
      <pre style={{ background: "#f0f0f0", padding: "10px", borderRadius: "4px" }}>VITE_METEOSOURCE_API_KEY=your_api_key_here</pre>
    </div>
  );
} else {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
