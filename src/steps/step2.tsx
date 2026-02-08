import { batch, createSignal } from "solid-js";
import IconButton from "../components/IconButton";
import IconClose from "../components/icons/IconClose";
import IconCheck from "../components/icons/IconCheck";
import { useStep } from "../context/step";
import { useStepData } from "../context/StepDataContext";
import { useAction } from "@solidjs/router";

export default function Step2() {
  const { next } = useStep();
  const [stepData, { setOwnHome }, saveLeadData] = useStepData();
  const [loading, setLoading] = createSignal(false);
  const submit = useAction(saveLeadData);

  const handleButtonClick = async (ownedHome: boolean) => {
    batch(() => {
      setLoading(true);
      setOwnHome(ownedHome);
    })

    await submit(stepData, stepData.visitorId ?? '').finally(() => {
      setLoading(false);
      next();
    });
  }
  return (
    <>
      <div class="mt-10 absolute h-full inset-0 flex flex-col items-center">
        <h3 class="text-[17px] leading-[100%] tracking-[-0.3px] font-medium text-center">
          Do you own your home?
        </h3>
        <div class="flex gap-4 items-center mt-10">
          <IconButton
            onClick={() => handleButtonClick(true)}
            class={stepData.ownHome ? "border-black" : ""}
            icon={<IconCheck />}
            disabled={loading()}
            loading={loading()}
          >
            Yes, I own my home
          </IconButton>
          <IconButton
            onClick={() => handleButtonClick(false)}
            class={!stepData.ownHome ? "border-black" : ""}
            icon={<IconClose />}
            disabled={loading()}
            loading={loading()}
          >
            No, I rent my home
          </IconButton>
        </div>
      </div>
    </>
  );
}
