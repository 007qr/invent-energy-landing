import { Component, Show, splitProps } from "solid-js";
import type { Accessor, JSX } from "solid-js";
import { cn } from "../utils/cn";
import IconLoading from "./icons/IconLoading";

type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: JSX.Element;
  loading: boolean;
};

const IconButton: Component<ButtonProps> = (props) => {
  const [local, rest] = splitProps(props, ["children", "icon", "loading"]);

  return (
    <button
      {...rest}
      class={cn(
        "w-35 h-30 relative rounded-[20px] border border-[#00000029] p-4 flex flex-col gap-3 text-[15px] tracking-[-0.3px] leading-[130%]",
        rest.class,
      )}
    >
      {local.icon}
      {local.children}
      <Show when={props.loading}>
        <IconLoading class="absolute right-2 w-4 h-4"/>
      </Show>
    </button>
  );
};

export default IconButton;
