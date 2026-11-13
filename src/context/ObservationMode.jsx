import { createContext, useCallback, useContext, useEffect, useState } from "react";

const ObservationContext = createContext({ on: false, toggle: () => {} });
const KEY = "observation-mode";

function readStored() {
  try {
    return localStorage.getItem(KEY) === "on";
  } catch {
    return false;
  }
}

/**
 * "Observation mode" reveals extra annotations (elements with the .obs class):
 * design decisions, technical notes and asides. The choice is remembered per
 * visitor in localStorage when available.
 */
export function ObservationProvider({ children }) {
  const [on, setOn] = useState(readStored);

  useEffect(() => {
    document.documentElement.dataset.observe = on ? "on" : "off";
    try {
      localStorage.setItem(KEY, on ? "on" : "off");
    } catch {
      /* storage unavailable — the toggle still works for this visit */
    }
  }, [on]);

  const toggle = useCallback(() => setOn((v) => !v), []);
  return <ObservationContext.Provider value={{ on, toggle }}>{children}</ObservationContext.Provider>;
}

export const useObservation = () => useContext(ObservationContext);
