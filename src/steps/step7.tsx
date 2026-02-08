import { createEffect, createSignal, onCleanup, Show } from "solid-js";
import Button from "../components/Button";
import { useStep } from "../context/step";
import FormatUtils from "../utils/format";
import IconSpinner from "../components/icons/IconSpinner";
import { useStepData } from "../context/StepDataContext";
import { useAction } from "@solidjs/router";
import { saveLeadData } from "~/actions/lead";

export default function Step7() {
  const { next } = useStep();
  const [stepData, { setEmail, setPhone }] = useStepData();
  const [loading, setLoading] = createSignal(false);
  const submit = useAction(saveLeadData);

  const handleSaveContact = async () => {
    setLoading(true);
    await submit(stepData, stepData.visitorId ?? '').finally(() => {
      setLoading(false);
      next();
    })
  }


  return (
    <Show when={!loading()} fallback={<StepLoading />}>
      <div class="mt-10 absolute h-full inset-0 flex flex-col items-center">
        <h3 class="text-[17px] leading-[100%] tracking-[-0.3px] font-medium text-center">
          Vish, how do we contact you?
        </h3>

        <div class="flex flex-col gap-2 mt-15.5">
          <label for="info" class="text-[#00000099] text-[13px] leading-[100%]">
            Your contact info
          </label>
          <input
            id="info-email"
            name="info"
            type="text"
            placeholder="Enter your email"
            value={stepData.email}
            onInput={(e) => setEmail(e.currentTarget.value)}
            class="border border-[#00000029] w-83 h-13 rounded-[48px] py-4 px-3 text-[13px] text-ellipsis"
          />
          <div class="relative">
            <span class="absolute left-3 w-14 appearance-none top-[27%] bg-transparent">
              🇺🇸 +1 &nbsp;&nbsp
            </span>
            <input
              id="info-phone"
              name="info"
              type="tel"
              placeholder="Your mobile number"
              value={stepData.phone}
              onInput={(e) => {
                const formatted = FormatUtils.formatUSPhone(
                  e.currentTarget.value,
                );
                setPhone(formatted);
                if (e.currentTarget.value !== formatted) {
                  e.currentTarget.value = formatted;
                }
              }}
              class="pl-14 border border-[#00000029] w-83 h-13 rounded-[48px] py-4 px-3 text-[13px] text-ellipsis"
            />
          </div>
        </div>
        <Button class="mt-5" onClick={handleSaveContact} disabled={loading()}>
          Calculate Savings
        </Button>
      </div>
    </Show>
  );
}

const MESSAGES = [
  "Checking eligibility...",
  "Searching for partners in Miami...",
  "Found 1 partner",
  "Good news! you’re eligible!",
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
      <div class="mt-[84px] mx-auto flex items-center inset-0 gap-3 flex-col absolute h-full">
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
