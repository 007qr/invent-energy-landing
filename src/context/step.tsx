import { createContext, useContext, createSignal, JSX } from "solid-js";

type StepContextType = {
  step: () => number;
  setStep: (v: number) => void;
  next: () => void;
  prev: () => void;
  reset: () => void;
};

const StepContext = createContext<StepContextType>();

export function StepProvider(props: {
  children: JSX.Element;
  initial?: number;
}) {
  const [step, setStep] = createSignal(props.initial ?? 4);

  const next = () => setStep((s) => s + 1);
  const prev = () => setStep((s) => Math.max(1, s - 1));
  const reset = () => setStep(props.initial ?? 1);

  const value: StepContextType = {
    step,
    setStep,
    next,
    prev,
    reset,
  };

  return (
    <StepContext.Provider value={value}>{props.children}</StepContext.Provider>
  );
}

export function useStep() {
  const ctx = useContext(StepContext);
  if (!ctx) throw new Error("useStep must be used inside StepProvider");
  return ctx;
}
