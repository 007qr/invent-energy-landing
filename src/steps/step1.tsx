import { createSignal, Show } from "solid-js";
import Button from "../components/Button";
import { useStep } from "../context/step";
import Slider from "../components/Slider";

export default function Step1() {
  const { next } = useStep();
  const [range, setRange] = createSignal(350);
  return (
    <>
      <div class="mt-[40px] absolute w-full h-full inset-0 flex flex-col items-center">
        <h3 class="text-[17px] leading-[100%] tracking-[-0.3px] font-medium">
          What is your average power bill?
        </h3>
        <h1 class="mt-[62px] text-[33px] leading-[100%] tracking-[-0.7px] font-semibold text-center">
          ${range()}
          <Show when={range() == 800}>+</Show>
        </h1>
        <Slider value={range} setValue={setRange} max={800} min={50} />
        <Button onClick={next}>Check Savings</Button>
      </div>
    </>
  );
}
