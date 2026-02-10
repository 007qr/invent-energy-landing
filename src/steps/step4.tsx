import { createSignal, For, onCleanup, onMount, Show } from "solid-js";
import Button from "../components/Button";
import { useStep } from "../context/step";
import IconSpinner from "../components/icons/IconSpinner";
import { useStepData } from "../context/StepDataContext";
import { useAction } from "@solidjs/router";
import { saveLeadData } from "~/actions/lead";

export default function Step4() {
  const { next } = useStep();
  const [stepData, { setAddress }] = useStepData();
  const [loading, setLoading] = createSignal(false);
  const [submitDone, setSubmitDone] = createSignal(false);

  const submit = useAction(saveLeadData);

  const handleSaveAddress = async () => {
    if (stepData.address.trim().length > 0) {
      setLoading(true);
      await submit(stepData).finally(() => {
        setSubmitDone(true);
      });
    }
  };

  return (
    <Show
      when={!loading()}
      fallback={
        <StepLoading
          onDone={() => {
            if (submitDone()) {
              next();
            }
          }}
        />
      }
    >
      <div class="mt-10 absolute h-full flex-col items-center flex inset-0">
        <h3 class="text-[17px] leading-[100%] tracking-[-0.3px] font-medium text-center">
          Let's calculate your savings
        </h3>

        <div class="flex flex-col gap-2 mt-15.5">
          <label
            for="home-address"
            class="text-[#00000099] text-[13px] leading-[100%]"
          >
            Your home address
          </label>
          <AddressAutocomplete value={stepData.address} onSelect={setAddress} onInput={setAddress} />

        </div>
        <Button onClick={handleSaveAddress} disabled={loading()}>
          Calculate Savings
        </Button>
      </div>
    </Show>
  );
}

const MESSAGES = [
  "Calculating savings",
  "This will take a few seconds",
  "Almost done calculating...",
];

function StepLoading(props: { onDone: () => void }) {
  const [cycleStep, setCycleStep] = createSignal(0);
  const [isVisible, setIsVisible] = createSignal(true);
  onMount(() => {
    let index = 0;
    const run = () => {
      if (index === MESSAGES.length - 1) {
        props.onDone();
        return;
      }
      setIsVisible(false);
      setTimeout(() => {
        index += 1;
        setCycleStep(index);
        setIsVisible(true);
        setTimeout(run, 2000);
      }, 300);
    };

    setTimeout(run, 2000);
  });

  return (
    <div class="mt-21 mx-auto flex items-center gap-3 flex-col absolute h-full inset-0">
      <IconSpinner class="animate-spin" />
      <div class="h-6 flex items-center justify-center min-w-50">
        <span
          class={`block text-center font-medium transition-opacity duration-300 ${
            isVisible() ? "opacity-100" : "opacity-0"
          }`}
        >
          {MESSAGES[cycleStep()]}
        </span>
      </div>
    </div>
  );
}


export function AddressAutocomplete(props: { value: string; onSelect: (address: string) => void; onInput: (address: string) => void }) {
  let wrapperRef!: HTMLDivElement
  let debounceTimer: ReturnType<typeof setTimeout> | undefined
  let sessionToken: google.maps.places.AutocompleteSessionToken | undefined

  const [suggestions, setSuggestions] = createSignal<google.maps.places.AutocompleteSuggestion[]>([])
  const [showDropdown, setShowDropdown] = createSignal(false)
  const [ready, setReady] = createSignal(false)

  onMount(async () => {
    try {
      const { AutocompleteSessionToken: Token } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary
      sessionToken = new Token()
      setReady(true)
    } catch (e) {
      console.error("Failed to load Places library:", e)
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef && !wrapperRef.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    onCleanup(() => document.removeEventListener("mousedown", handleClickOutside))
  })

  onCleanup(() => {
    if (debounceTimer) clearTimeout(debounceTimer)
  })

  const fetchSuggestions = (input: string) => {
    if (debounceTimer) clearTimeout(debounceTimer)
    if (!input.trim() || !ready()) {
      setSuggestions([])
      setShowDropdown(false)
      return
    }
    debounceTimer = setTimeout(async () => {
      try {
        const { suggestions: results } =
          await google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions({
            input,
            sessionToken,
            includedPrimaryTypes: ["street_address", "premise"],
          })
        if (results.length > 0) {
          setSuggestions(results)
          setShowDropdown(true)
        } else {
          setSuggestions([])
          setShowDropdown(false)
        }
      } catch (e) {
        console.error("Autocomplete error:", e)
        setSuggestions([])
        setShowDropdown(false)
      }
    }, 300)
  }

  const handleSelect = async (suggestion: google.maps.places.AutocompleteSuggestion) => {
    try {
      const place = suggestion.placePrediction!.toPlace()
      await place.fetchFields({ fields: ["formattedAddress"] })
      const address = place.formattedAddress ?? suggestion.placePrediction!.text.text
      props.onSelect(address)
    } catch {
      const fallback = suggestion.placePrediction?.text?.text ?? ""
      props.onSelect(fallback)
    }

    setSuggestions([])
    setShowDropdown(false)

    // Start a new session after selection
    const { AutocompleteSessionToken: Token } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary
    sessionToken = new Token()
  }

  return (
    <div ref={wrapperRef} class="relative">
      <input
        id="home-address"
        name="home-address"
        type="text"
        placeholder="Enter your home address"
        value={props.value}
        onInput={(e) => {
          props.onInput(e.currentTarget.value)
          fetchSuggestions(e.currentTarget.value)
        }}
        onFocus={() => { if (suggestions().length > 0) setShowDropdown(true) }}
        autocomplete="off"
        class="border border-[#00000029] w-83 h-13 rounded-[48px] py-4 px-3 text-[13px] text-ellipsis"
      />
      <Show when={showDropdown() && suggestions().length > 0}>
        <ul class="absolute z-50 top-full mt-1 w-83 bg-white border border-[#00000029] rounded-2xl shadow-lg overflow-hidden max-h-60 overflow-y-auto">
          <For each={suggestions()}>
            {(suggestion) => (
              <li
                class="px-3 py-2.5 text-[13px] cursor-pointer hover:bg-[#f5f5f5] transition-colors border-b border-[#00000010] last:border-b-0"
                onMouseDown={() => handleSelect(suggestion)}
              >
                {suggestion.placePrediction?.text?.text}
              </li>
            )}
          </For>
        </ul>
      </Show>
    </div>
  )
}
