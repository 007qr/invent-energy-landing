import { createSignal } from "solid-js";
import Button from "../components/Button";
import { useStep } from "../context/step";
import { useStepData } from "../context/StepDataContext";
import { useAction } from "@solidjs/router";
import { saveLeadData } from "~/actions/lead";
import { Show } from "solid-js";
import IconLoading from "~/components/icons/IconLoading";

export default function Step6() {
  const { next } = useStep();
  const [stepData, { setFullName }] = useStepData();
  const [loading, setLoading] = createSignal(false);
  const submit = useAction(saveLeadData);

  const handleSaveFullName = async () => {
    setLoading(true);
    await submit(stepData).finally(() => {
      setLoading(false);
      next();
    })
  }


  return (
    <div class="mt-10 absolute h-full inset-0 flex flex-col items-center">
      <h3 class="text-[17px] leading-[100%] tracking-[-0.3px] font-medium text-center">
        What is your full name?
      </h3>

      <div class="flex flex-col gap-2 mt-15.5">
        <label
          for="full-name"
          class="text-[#00000099] text-[13px] leading-[100%]"
        >
          Your full name
        </label>
        <input
          id="full-name"
          name="full-name"
          type="text"
          placeholder="Enter your full name"
          value={stepData.fullName}
          onInput={(e) => setFullName(e.currentTarget.value)}
          class="border border-[#00000029] w-83 h-13 rounded-[48px] py-4 px-3 text-[13px] text-ellipsis"
        />
      </div>
      <Button onClick={handleSaveFullName} disabled={loading()}  class="flex items-center justify-center gap-2">
        <Show when={!loading()} fallback={<IconLoading class="w-6 h-6"/>}>
          Calculate Savings
        </Show>
      </Button>
    </div>
  );
}
