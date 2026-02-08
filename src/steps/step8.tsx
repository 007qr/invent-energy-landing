import { useStepData } from "~/context/StepDataContext";
import Button from "../components/Button";
import RadioIconFilled from "~/components/icons/IconRadioFilled";
import IconCheckMark from "~/components/icons/IconCheckMark";

export default function Step8() {
  const [stepData] = useStepData();
  return (
    <div class="mt-5.5 absolute h-full inset-0 items-center flex flex-col">
      <div class="flex flex-col gap-5">
        <div class="flex flex-col gap-2 border-2 border-[#26BC2B] rounded-3xl w-89 p-4">
          <div class="flex justify-between">
            <div>
              <h4 class="text-[17px] font-medium leading-[130%] tracking-normal">
                Invent Energy
              </h4>
              <p class="text-[13px] leading-[130%] tracking-normal">
                Battery manufacturer. Made in {stepData.country || "USA"}.
              </p>
            </div>
            <RadioIconFilled class="w-[21px] h-[21px]" />
          </div>
          <div class="flex flex-col gap-2">
            <p class="underline text-[15px] leading-[130%] tracking-normal">
              {stepData.city} Residents qualify for:
            </p>
            <div>
              <span class="flex gap-1.5">
                <IconCheckMark />
                <p class="text-[15px] font-medium leading-[100%] tracking-normal h-[20px] flex items-center">
                  Free power saving assessment
                </p>
              </span>
              <span class="flex gap-1">
                <IconCheckMark />
                <p class="text-[15px] font-medium leading-[100%] tracking-normal h-[20px] flex items-center">
                  Free on-site installation
                </p>
              </span>
              <span class="flex gap-1">
                <IconCheckMark />
                <p class="text-[15px] font-medium leading-[100%] tracking-normal flex items-center h-[20px]">
                  Free battery backup
                </p>
              </span>
            </div>
          </div>
        </div>

        <div class="h-px w-full bg-[#0000001F]" />

        <div class="w-81 flex flex-col gap-5 mx-auto">
          <p class="text-[17px] leading-[120%] font-medium tracking-normal">
            Invent Energy saves your power bill by providing free batteries that
            charge overnight to power your home during peak hours.
          </p>
          <span class="text-[17px] leading-[120%] font-medium tracking-normal">
            <span class="text-[#1D7911] underline">
              586 residents saved 30%{" "}
            </span>{" "}
            on average {stepData.city ? "in " + stepData.city : ""}. Save yours
            too! Limited spots.
          </span>
        </div>

        <div class="h-px w-full bg-[#0000001F]" />
      </div>
      <div class="mt-18.5 w-87">
        <span class="text-[15px] leading-[120%] font-medium text-center">
          <p>
            {stepData.fullName}, due to high demand, only{" "}
            <span class="text-[#C42323] underline">12 spots left.</span>
          </p>
          <p>Book your call today.</p>
        </span>

        <Button class="mt-13.75">Book a call</Button>
      </div>
    </div>
  );
}
