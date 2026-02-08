import { batch, createSignal } from "solid-js";
import IconButton from "../components/IconButton";
import IconHome from "../components/icons/IconHome";
import IconBuilding from "../components/icons/IconBuilding";
import { useStep } from "../context/step";
import { useStepData } from "../context/StepDataContext";
import { useAction } from "@solidjs/router";
import { saveLeadData } from "~/actions/lead";

export default function Step3() {
  const { next } = useStep();
  const [stepData, { setHomeType  }] = useStepData();
  const [loading, setLoading] = createSignal(false);
  const submit = useAction(saveLeadData);

  const handleButtonClick = async (homeType: 'single' | 'mobile') => {
    batch(() => {
      setLoading(true);
      setHomeType(homeType);
    })

    await submit(stepData).finally(() => {
      setLoading(false);
      next();
    });

  }
  return (
    <div class="mt-10 absolute h-full inset-0 flex items-center flex-col">
      <h3 class="text-[17px] leading-[100%] tracking-[-0.3px] font-medium text-center">
        What is your home type?
      </h3>

      <div class="flex gap-4 items-center mt-10">
        <IconButton
          onClick={() => handleButtonClick("single")}
          class={stepData.homeType === "single" ? "border-black" : ""}
          icon={<IconHome />}
          disabled={loading()}
          loading={loading()}
        >
          Single family home
        </IconButton>

        <IconButton
          onClick={() => handleButtonClick("mobile")}
          class={stepData.homeType === "mobile" ? "border-black" : ""}
          icon={<IconBuilding />}
          disabled={loading()}
          loading={loading()}
        >
          Mobile home
        </IconButton>
      </div>
    </div>
  );
}
