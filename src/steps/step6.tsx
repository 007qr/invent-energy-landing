import { createEffect, createSignal } from "solid-js";
import Button from "../components/Button";
import { useStep } from "../context/step";

export default function Step6() {
  const { next } = useStep();
  const [input, setInput] = createSignal("");

  return (
    <div class="mt-[40px] absolute h-full inset-0 flex flex-col items-center">
      <h3 class="text-[17px] leading-[100%] tracking-[-0.3px] font-medium text-center">
        What is your full name?
      </h3>

      <div class="flex flex-col gap-2 mt-[62px]">
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
          value={input()}
          onInput={(e) => setInput(e.currentTarget.value)}
          class="border border-[#00000029] w-[332px] h-[52px] rounded-[48px] py-4 px-3 text-[13px] text-ellipsis"
        />
      </div>
      <Button onClick={() => next()}>Calculate Savings</Button>
    </div>
  );
}
