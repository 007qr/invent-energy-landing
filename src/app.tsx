// @refresh reload
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import { StepProvider } from "./context/step";

export default function App() {
  return (
    <Router
      root={props => (
        <>
          <Suspense>
            <StepProvider>
              {props.children}
            </StepProvider>
          </Suspense>
        </>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
