import type { Component, JSX } from "solid-js";

type CloseIconProps = JSX.SvgSVGAttributes<SVGSVGElement>;

const CloseIcon: Component<CloseIconProps> = (props) => {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.2637 28.7384L20.002 20.0001L28.7403 28.7384M28.7403 11.2617L20.0003 20.0001L11.2637 11.2617"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default CloseIcon;
