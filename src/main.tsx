import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<div className="fixed inset-0 z-50 flex items-center justify-center bg-background"><div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" /></div>}>
    <App />
  </Suspense>
);
