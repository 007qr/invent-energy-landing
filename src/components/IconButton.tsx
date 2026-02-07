import { Component, splitProps } from "solid-js";
import type { JSX } from "solid-js";
import { cn } from "../utils/cn";

type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: JSX.Element;
};

const IconButton: Component<ButtonProps> = (props) => {
  const [local, rest] = splitProps(props, ["children", "icon"]);

  return (
    <button
      {...rest}
      class={cn(
        "w-[140px] h-[120px] rounded-[20px] border border-[#00000029] p-4 flex flex-col gap-3 text-[15px] tracking-[-0.3px] leading-[130%]",
        rest.class,
      )}
    >
      {local.icon}
      {local.children}
    </button>
  );
};

export default IconButton;
