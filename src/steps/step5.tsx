import { createEffect, createSignal } from "solid-js";
import Button from "../components/Button";
import { useStep } from "../context/step";

export default function Step5() {
  const { next } = useStep();

  return (
    <div class="mx-auto absolute h-full inset-0 flex items-center flex-col">
      <div class="w-[272px] mx-auto mt-[56px]">
        <span class="text-center">
          <p class="text-[13px] leading-[140%] tracking-normal font-medium">
            1772 Center Street NE —{" "}
          </p>
          <p class="text-[13px] leading-[140%] tracking-normal text-[#303030]">
            is eligible for up to{" "}
            <span class="text-[#1d7911] font-medium">30% savings.</span>
          </p>
        </span>
        <div class="h-px w-full bg-[#0000001F] my-3" />
        <div class="flex flex-col gap-2">
          <span class="w-full flex justify-between">
            <span class="text-[15px] leading-[100%]">Your current bill</span>
            <span class="text-[15px] leading-[100%] tracking-[-0.3px] line-through font-medium">
              $350
            </span>
          </span>
          <span class="w-full flex justify-between mt-1">
            <span class="text-[15px] leading-[100%]">New Estimate</span>
            <span class="text-[21px] leading-[100%] tracking-[-0.3px] font-medium">
              $140
            </span>
          </span>
          <div class="h-px w-full bg-[#0000001F] my-3" />
          <span class="text-[17px] font-medium leading-[100%] tracking-[-0.3px] text-center">
            You can save up to{" "}
            <span class="text-[#1D7911] underline">$210 per month.</span>
          </span>
        </div>
      </div>
      <Button class="mt-[70px]" onClick={() => next()}>
        Unlock my Savings
      </Button>
    </div>
  );
}
