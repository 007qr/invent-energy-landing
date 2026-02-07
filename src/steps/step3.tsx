import { createEffect, createSignal } from "solid-js";
import IconButton from "../components/IconButton";
import IconHome from "../components/icons/IconHome";
import IconBuilding from "../components/icons/IconBuilding";
import { useStep } from "../context/step";

export default function Step3() {
  const [ownedHome, setOwnedHome] = createSignal<boolean>(false);
  const { next } = useStep();

  createEffect(() => {
    console.log("ownedHome changed:", ownedHome());
  });

  return (
    <div class="mt-[40px] absolute h-full inset-0 flex items-center flex-col">
      <h3 class="text-[17px] leading-[100%] tracking-[-0.3px] font-medium text-center">
        What is your home type?
      </h3>

      <div class="flex gap-4 items-center mt-[40px]">
        <IconButton
          onClick={() => {
            setOwnedHome(true);
            next();
          }}
          class={ownedHome() ? "border-black" : ""}
          icon={<IconHome />}
        >
          Single family home
        </IconButton>

        <IconButton
          onClick={() => {
            setOwnedHome(false);
            next();
          }}
          class={!ownedHome() ? "border-black" : ""}
          icon={<IconBuilding />}
        >
          Mobile home
        </IconButton>
      </div>
    </div>
  );
}
