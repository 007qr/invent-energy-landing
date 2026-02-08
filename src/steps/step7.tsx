import { createEffect, createSignal, onCleanup, onMount, Show } from "solid-js";
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
  const [submitDone, setSubmitDone] = createSignal(false);

  const submit = useAction(saveLeadData);

  const handleSaveContact = async () => {
    if (stepData.email.trim().length > 0 && stepData.phone.trim().length > 0) {
      setLoading(true);
      submit(stepData).finally(() => {
        setSubmitDone(true);
      });
    }
  };

  return (
    <Show
      when={!loading()}
      fallback={
        <StepLoading
          onDone={() => {
            if (submitDone()) {
              next();
            }
          }}
        />
      }
    >
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

function StepLoading(props: { onDone: () => void }) {
  const [cycleStep, setCycleStep] = createSignal(0);
  const [isVisible, setIsVisible] = createSignal(true);
  const [stepData] = useStepData();

  onMount(() => {
    if (stepData.city) {
      MESSAGES[1] = `Searching for partners in ${stepData.city}...`;
    } else {
      MESSAGES[1] = "Searching for partners";
    }

    let index = 0;

    const run = () => {
      if (index === MESSAGES.length - 1) {
        props.onDone();
        return;
      }

      setIsVisible(false);

      setTimeout(() => {
        index += 1;
        setCycleStep(index);
        setIsVisible(true);
        setTimeout(run, 2000);
      }, 300);
    };

    setTimeout(run, 2000);
  });

  return (
    <div class="mt-21 mx-auto flex items-center gap-3 flex-col absolute h-full inset-0">
      <IconSpinner class="animate-spin" />
      <div class="h-6 flex items-center justify-center min-w-50">
        <span
          class={`block text-center font-medium transition-opacity duration-300 ${
            isVisible() ? "opacity-100" : "opacity-0"
          }`}
        >
          {MESSAGES[cycleStep()]}
        </span>
      </div>
    </div>
  );
}
