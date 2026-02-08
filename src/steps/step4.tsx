import {
  createEffect,
  createSignal,
  onCleanup,
  Show,
} from "solid-js";
import Button from "../components/Button";
import { useStep } from "../context/step";
import IconSpinner from "../components/icons/IconSpinner";
import { useStepData } from "../context/StepDataContext";
import { useAction } from "@solidjs/router";
import { saveLeadData } from "~/actions/lead";

export default function Step4() {
  const { next } = useStep();
  const [stepData, { setAddress }] = useStepData();
  const [loading, setLoading] = createSignal(false);
  const submit = useAction(saveLeadData);

  const handleSaveAddress = async () => {
    setLoading(true);
      await submit(stepData).finally(() => {
        setLoading(false);
        next();
      })
  };

  return (
    <Show when={!loading()} fallback={<StepLoading />}>
      <div class="mt-10 absolute h-full flex-col items-center flex inset-0">
        <h3 class="text-[17px] leading-[100%] tracking-[-0.3px] font-medium text-center">
          Let’s calculate your savings
        </h3>

        <div class="flex flex-col gap-2 mt-15.5">
          <label
            for="home-address"
            class="text-[#00000099] text-[13px] leading-[100%]"
          >
            Your home address
          </label>
          <input
            id="home-address"
            name="home-address"
            type="text"
            placeholder="Enter your home address"
            value={stepData.address}
            onInput={(e) => setAddress(e.currentTarget.value)}
            class="border border-[#00000029] w-83 h-13 rounded-[48px] py-4 px-3 text-[13px] text-ellipsis"
          />
        </div>
        <Button onClick={handleSaveAddress} disabled={loading()}>
          Calculate Savings
        </Button>
      </div>
    </Show>
  );
}

const MESSAGES = [
  "Calculating savings",
  "This will take a few seconds",
  "Almost done calculating...",
];

function StepLoading() {
  const [cycleStep, setCycleStep] = createSignal(0);
  const [isVisible, setIsVisible] = createSignal(true);

  createEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCycleStep((prev) => (prev + 1) % MESSAGES.length);
        setIsVisible(true);
      }, 300);
    }, 2000);

    onCleanup(() => clearInterval(interval));
  });

  return (
    <>
      <div class="mt-21 mx-auto flex items-center gap-3 flex-col absolute h-full inset-0">
        <IconSpinner class="animate-spin" />
        <div class="h-6 flex items-center justify-center min-w-50">
          <span
            class={`
              block text-center font-medium transition-opacity duration-300 ease-in-out
              ${isVisible() ? "opacity-100" : "opacity-0"}
            `}
          >
            {MESSAGES[cycleStep()]}
          </span>
        </div>
      </div>
    </>
  );
}
