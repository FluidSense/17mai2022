import { Flex } from "@chakra-ui/react";
import { getPlaceFromPlaceName, Place } from "../../models/place";
import { Timeline } from "../../models/timeline";
import TimelineArticle from "./Location";
import Filler from "./Filler";
import UncertainStop from "./UncertainStop";
import { MutableRefObject } from "react";

interface Props {
  completeTimeline: Timeline[];
  places: Place[];
  mapMarkerRefs: MutableRefObject<L.Popup | null>[];
  mapRef: MutableRefObject<L.Map | null>;
}

export default function TimelineView({
  completeTimeline,
  places,
  mapMarkerRefs,
  mapRef,
}: Props) {
  return (
    <Flex direction="column" style={{ margin: "0 5%" }}>
      {completeTimeline.map((timeline, index) => {
        const place = getPlaceFromPlaceName(places, timeline.placeId);

        function handleClick() {
          if (place) {
            const maybeRef = findMarkerForPlaceByRef(mapMarkerRefs, place);
            if (maybeRef?.current) {
              window.scrollTo(0, 0);
              mapRef.current?.openPopup(maybeRef?.current);
            }
          }
        }
        return (
          <>
            {timeline.arrival ? (
              <TimelineArticle
                place={place}
                timeline={timeline}
                handleClick={handleClick}
                key={timeline.placeId + timeline.type}
              />
            ) : (
              <UncertainStop
                timelineItem={timeline}
                key={timeline.placeId + timeline.type}
              />
            )}
            {index < completeTimeline.length - 1 && (
              <Filler key={index + "filler"} />
            )}
          </>
        );
      })}
    </Flex>
  );
}

function findMarkerForPlaceByRef(
  mapMarkerRefs: MutableRefObject<L.Popup | null>[],
  place: Place
) {
  return mapMarkerRefs.find((ref) => {
    const latlong = ref.current?.getLatLng();
    const maybeLat = latlong?.lat;
    const maybeLong = latlong?.lng;
    return place.lat === maybeLat && place.long === maybeLong;
  });
}
