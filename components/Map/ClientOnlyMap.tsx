import dynamic from "next/dynamic";
import { MutableRefObject } from "react";
import { Place } from "../../models/place";
import { Timeline } from "../../models/timeline";

const InnerMap = dynamic(() => import("../Map"), {
  ssr: false,
});

interface MapProps {
  places: Place[];
  timeline: Timeline[];
  setPopupRefs: (refs: MutableRefObject<L.Popup | null>[]) => void;
  setMapRef: (ref: MutableRefObject<L.Map | null>) => void;
}

export default function MapWrapper({
  places,
  timeline,
  setPopupRefs,
  setMapRef,
}: MapProps) {
  return (
    <div style={{ height: "300px", width: "100%" }}>
      <InnerMap
        places={places}
        setPopupRefs={setPopupRefs}
        setMapRef={setMapRef}
      />
    </div>
  );
}
