import { createSignal } from "solid-js";
import IconButton from "../components/IconButton";
import IconClose from "../components/icons/IconClose";
import IconCheck from "../components/icons/IconCheck";
import { useStep } from "../context/step";

export default function Step2() {
  const [ownedHome, setOwnedHome] = createSignal(true);
  const { next } = useStep();
  return (
    <>
      <div class="mt-[40px] absolute h-full inset-0 flex flex-col items-center">
        <h3 class="text-[17px] leading-[100%] tracking-[-0.3px] font-medium text-center">
          Do you own your home?
        </h3>
        <div class="flex gap-4 items-center mt-[40px]">
          <IconButton
            onClick={() => {
              setOwnedHome(true);
              next();
            }}
            class={ownedHome() ? "border-black" : ""}
            icon={<IconCheck />}
          >
            Yes, I own my home
          </IconButton>
          <IconButton
            onClick={() => {
              setOwnedHome(false);
              next();
            }}
            class={!ownedHome() ? "border-black" : ""}
            icon={<IconClose />}
          >
            No, I rent my home
          </IconButton>
        </div>
      </div>
    </>
  );
}
