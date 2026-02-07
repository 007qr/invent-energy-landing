import type { Component, JSX } from "solid-js";

type IconCheckMarkProps = JSX.SvgSVGAttributes<SVGSVGElement>;

const IconCheckMark: Component<IconCheckMarkProps> = (props) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.4587 5.84839L8.74449 13.5626C8.58822 13.7188 8.3763 13.8065 8.15533 13.8065C7.93436 13.8065 7.72243 13.7188 7.56616 13.5626L3.54199 9.53839"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default IconCheckMark;
