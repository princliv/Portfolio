import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AppLoader } from "./components/ui/AppLoader.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<AppLoader />}>
    <App />
    <AppLoader />
  </Suspense>
);
