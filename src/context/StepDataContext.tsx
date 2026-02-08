import { createContext, useContext, createEffect, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import { getGeoInfo, saveLeadData } from "../actions/lead";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { createAsync } from "@solidjs/router";

export type StepDataContextState = {
  powerBill: number;
  ownHome: boolean;
  homeType: "single" | "mobile";
  address: string;
  fullName: string;
  email: string;
  phone: string;
  ipAddress?: string;
  city?: string;
  region?: string;
  country?: string;
  postalCode?: string;
  visitorId?: string; // For fingerprint
};

type StepDataContextValue = [
  state: StepDataContextState,
  actions: {
    setPowerBill: (powerBill: number) => void;
    setOwnHome: (ownHome: boolean) => void;
    setHomeType: (homeType: "single" | "mobile") => void;
    setAddress: (address: string) => void;
    setFullName: (fullName: string) => void;
    setEmail: (email: string) => void;
    setPhone: (phone: string) => void;
    setIpData: (data: {
      ipAddress: string;
      city: string;
      region: string;
      country: string;
      postalCode: string;
    }) => void;
    setVisitorId: (id: string) => void;
  },
  saveDataAction: typeof saveLeadData
];

const StepDataContext = createContext<StepDataContextValue>();

export function StepDataProvider(props: { children: any }) {
  const [state, setState] = createStore<StepDataContextState>({
    powerBill: 350,
    ownHome: true,
    homeType: "single",
    address: "",
    fullName: "",
    email: "",
    phone: "",
  });

  const geoInfo = createAsync(async ()=> getGeoInfo());

  // Load fingerprint on component mount
  onMount(() => {
    const getVisitorId = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      setState("visitorId", result.visitorId);
    };
    getVisitorId();
  });

  createEffect(() =>{
    if (geoInfo()) {
      setState("city", geoInfo()?.city);
      setState("region", geoInfo()?.region);
      setState("country", geoInfo()?.country);
    }
  })

  const actions = {
    setPowerBill(powerBill: number) { setState("powerBill", powerBill); },
    setOwnHome(ownHome: boolean) { setState("ownHome", ownHome); },
    setHomeType(homeType: "single" | "mobile") { setState("homeType", homeType); },
    setAddress(address: string) { setState("address", address); },
    setFullName(fullName: string) { setState("fullName", fullName); },
    setEmail(email: string) { setState("email", email); },
    setPhone(phone: string) { setState("phone", phone); },
    setIpData(data: { ipAddress: string; city: string; region: string; country: string; postalCode: string; }) {
      setState("ipAddress", data.ipAddress);
      setState("city", data.city);
      setState("region", data.region);
      setState("country", data.country);
      setState("postalCode", data.postalCode);
    },
    setVisitorId(id: string) {
      setState("visitorId", id);
    },
  };

  return (
    <StepDataContext.Provider value={[state, actions, saveLeadData]}>
      {props.children}
    </StepDataContext.Provider>
  );
}

export function useStepData() {
  const context = useContext(StepDataContext);
  if (!context) {
    throw new Error("useStepData must be used within a StepDataProvider");
  }
  return context;
}
