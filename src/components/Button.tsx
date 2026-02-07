import { Component, splitProps } from "solid-js";
import type { JSX } from "solid-js";
import { cn } from "../utils/cn";

type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: Component<ButtonProps> = (props) => {
  const [local, rest] = splitProps(props, ["children"]);

  return (
    <button
      {...rest}
      class={cn(
        "w-[332px] h-[52px] py-[16px] px-[24px] bg-black text-white rounded-[32px] font-semibold text-[15px] leading-[100%] mt-[96px]",
        rest.class,
      )}
    >
      {local.children}
    </button>
  );
};

export default Button;
