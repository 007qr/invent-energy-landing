import { Accessor, createSignal, onCleanup, Setter } from "solid-js";

export default function Slider(props: {
  value: Accessor<number>;
  setValue: (ms: number) => void;
  max: number;
  min: number;
}) {
  const [isDragging, setIsDragging] = createSignal(false);
  let trackRef: HTMLDivElement | undefined;

  // Helper: Convert the raw value to a percentage (0-100) for CSS
  const getPercentage = () => {
    const range = props.max - props.min;
    if (range === 0) return 0;
    const percent = ((props.value() - props.min) / range) * 100;
    return Math.max(0, Math.min(100, percent));
  };

  // --- MOUSE HANDLERS ---
  const handleMouseDown = (e: MouseEvent) => {
    setIsDragging(true);
    updateValue(e);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging()) {
      updateValue(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  // --- TOUCH HANDLERS (Mobile) ---
  const handleTouchStart = (e: TouchEvent) => {
    setIsDragging(true);
    updateValue(e);
    // Add window listeners for drag and drop behavior
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging()) {
      updateValue(e);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    window.removeEventListener("touchmove", handleTouchMove);
    window.removeEventListener("touchend", handleTouchEnd);
  };

  // --- LOGIC ---
  const updateValue = (e: MouseEvent | TouchEvent) => {
    if (!trackRef) return;

    // Detect Client X position based on event type
    let clientX;
    if ("touches" in e) {
      // Touch Event
      clientX = e.touches[0].clientX;
    } else {
      // Mouse Event
      clientX = e.clientX;
    }

    const rect = trackRef.getBoundingClientRect();
    let ratio = (clientX - rect.left) / rect.width;

    // Clamp ratio between 0 and 1
    ratio = Math.max(0, Math.min(1, ratio));

    // Calculate raw value
    const range = props.max - props.min;
    const rawValue = props.min + ratio * range;

    // Round to nearest integer
    props.setValue(Math.round(rawValue));
  };

  onCleanup(() => {
    if (typeof window !== "undefined") {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    }
  });

  return (
    <div class="flex flex-col items-center justify-center p-5">
      <div
        ref={trackRef}
        // Added onTouchStart here
        // 'touch-none' is crucial on mobile to prevent the browser
        // from scrolling the page while you drag the slider
        class="relative w-[270px] h-[24px] cursor-pointer flex items-center select-none touch-none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Background Track (Light Blue) */}
        <div class="absolute w-full h-[12px] bg-[#e6f7ff] rounded-full z-0"></div>

        {/* Filled Track (Solid Blue) */}
        <div
          style={{
            width: `${getPercentage()}%`,
          }}
          class="absolute h-[12px] bg-[#3b82f6] rounded-full z-1 pointer-events-none"
        ></div>

        {/* Thumb (Circle) */}
        <div
          style={{
            "box-shadow": "0 2px 4px rgba(0,0,0,0.1)",
            left: `${getPercentage()}%`,
            transform: "translate(-50%, -50%)",
          }}
          class="absolute top-1/2 w-[24px] h-[24px] bg-white rounded-[50%] border-[4px] border-[#3b82f6] box-border z-2 pointer-events-none"
        ></div>
      </div>
    </div>
  );
}
