import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import { StepProvider } from "./context/step";
import { StepDataProvider } from "./context/StepDataContext";

export default function App() {
  return (
    <Router
      root={props => (
        <>
          <Suspense>
            <StepDataProvider>
              <StepProvider>
                {props.children}
              </StepProvider>
            </StepDataProvider>
          </Suspense>
        </>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
