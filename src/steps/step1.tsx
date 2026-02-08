import { createSignal, Show } from "solid-js";
import Button from "../components/Button";
import { useStep } from "../context/step";
import Slider from "../components/Slider";
import { useStepData } from "../context/StepDataContext";
import { saveLeadData } from "~/actions/lead";
import { useAction } from "@solidjs/router";
import IconLoading from "~/components/icons/IconLoading";

export default function Step1() {
  const { next } = useStep();
  const [stepData, {setPowerBill}] = useStepData();
  const [loading, setLoading] = createSignal(false);
  const submit = useAction(saveLeadData);

  const handleCheckSavings = async () => {
    setLoading(true);
    await submit(stepData, stepData.visitorId ?? '').finally(() => { setLoading(false); next() });
  };

  return (
    <>
      <div class="mt-10 absolute w-full h-full inset-0 flex flex-col items-center">
        <h3 class="text-[17px] leading-[100%] tracking-[-0.3px] font-medium">
          What is your average power bill?
        </h3>
        <h1 class="mt-15.5 text-[33px] leading-[100%] tracking-[-0.7px] font-semibold text-center">
          ${stepData.powerBill}
          <Show when={stepData.powerBill == 800}>+</Show>
        </h1>
        <Slider value={() => stepData.powerBill} setValue={setPowerBill} max={800} min={50} />
        <Button onClick={handleCheckSavings} disabled={loading()} class="flex items-center justify-center gap-2">
          <Show when={loading()} fallback={"Check Savings"}>
            <IconLoading class="w-6 h-6" />
          </Show>
        </Button>
      </div>
    </>
  );
}
