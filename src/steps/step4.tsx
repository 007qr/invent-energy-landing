import {
  createEffect,
  createSignal,
  Match,
  onCleanup,
  Show,
  Switch,
} from "solid-js";
import Button from "../components/Button";
import { useStep } from "../context/step";
import IconSpinner from "../components/icons/IconSpinner";

export default function Step4() {
  const { next } = useStep();
  const [input, setInput] = createSignal("");
  const [loading, setLoading] = createSignal(false);

  const handleCalculateSavings = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      next();
    }, 6000);
  };

  return (
    <Show when={!loading()} fallback={<StepLoading />}>
      <div class="mt-[40px] absolute h-full flex-col items-center flex inset-0">
        <h3 class="text-[17px] leading-[100%] tracking-[-0.3px] font-medium text-center">
          Let’s calculate your savings
        </h3>

        <div class="flex flex-col gap-2 mt-[62px]">
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
            value={input()}
            onInput={(e) => setInput(e.currentTarget.value)}
            class="border border-[#00000029] w-[332px] h-[52px] rounded-[48px] py-4 px-3 text-[13px] text-ellipsis"
          />
        </div>
        <Button onClick={handleCalculateSavings}>Calculate Savings</Button>
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
      <div class="mt-[84px] mx-auto flex items-center gap-3 flex-col absolute h-full inset-0">
        {/* Assuming IconSpinner is imported */}
        <IconSpinner class="animate-spin" />

        {/* h-6: Fixed height prevents the layout from collapsing/jumping
                during the split second the text is swapping.
        */}
        <div class="h-6 flex items-center justify-center min-w-[200px]">
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
