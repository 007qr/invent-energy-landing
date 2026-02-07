import type { Component, JSX } from "solid-js";

type CheckIconProps = JSX.SvgSVGAttributes<SVGSVGElement>;

const CheckIcon: Component<CheckIconProps> = (props) => {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M32.9163 11.6968L17.488 27.1251C17.1755 27.4376 16.7516 27.6131 16.3097 27.6131C15.8677 27.6131 15.4439 27.4376 15.1313 27.1251L7.08301 19.0768"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default CheckIcon;
