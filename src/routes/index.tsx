import { Match, Show, Switch, type Component } from "solid-js";
import { TransitionGroup } from "solid-transition-group";

import Step1 from "../steps/step1";
import Step2 from "../steps/step2";
import Step3 from "../steps/step3";
import Step4 from "../steps/step4";
import Step5 from "../steps/step5";
import Step6 from "../steps/step6";
import Step7 from "../steps/step7";
import Step8 from "../steps/step8";

import { useStep } from "../context/step";
import { useStepData } from "~/context/StepDataContext";

const App: Component = () => {
  const { step } = useStep();
  const [stepData] = useStepData();
  return (
    <>
      <div class="font-instrument-sans mt-11 overflow-hidden w-98.25 mx-auto flex flex-col items-center justify-center">
        <div class="w-66.75 mx-auto flex flex-col gap-1">
          <p class="font-instrument-serif text-[17px] leading-[100%] italic text-center">
            {stepData.city} {' '}
            Exclusive
          </p>
          <p class="text-xl font-bold text-[21px] leading-[120%] tracking-normal text-center">
            <Show
              when={step() === 8}
              fallback={"Check Eligibility for Lower Power Costs"}
            >
              Congrats! You’re eligible for lower power bill.
            </Show>
          </p>
        </div>
        <div class="w-full mt-5.5 h-px bg-[#0000001F]" />
        <div class="relative w-full h-[95vh]">
          <TransitionGroup name="slide-fade">
            <Switch>
              <Match when={step() === 1}>
                <Step1 />
              </Match>
              <Match when={step() === 2}>
                <Step2 />
              </Match>
              <Match when={step() === 3}>
                <Step3 />
              </Match>
              <Match when={step() === 4}>
                <Step4 />
              </Match>
              <Match when={step() === 5}>
                <Step5 />
              </Match>
              <Match when={step() === 6}>
                <Step6 />
              </Match>
              <Match when={step() === 7}>
                <Step7 />
              </Match>
              <Match when={step() === 8}>
                <Step8 />
              </Match>
            </Switch>
          </TransitionGroup>
        </div>
      </div>
    </>
  );
};

export default App;
