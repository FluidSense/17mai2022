import { Flex } from "@chakra-ui/react";
import { Place } from "../../models/place";
import { Timeline } from "../../models/timeline";
import TimelineArticle from "./Location";
import Filler from "./Filler";
import UncertainStop from "./UncertainStop";

interface Props {
  completeTimeline: Timeline[];
  places: Place[];
}

export default function TimelineView({ completeTimeline, places }: Props) {
  return (
    <Flex direction="column" style={{ margin: "0 5%" }}>
      {completeTimeline.map((timeline, index) => (
        <>
          {timeline.arrival ? (
            <TimelineArticle places={places} timeline={timeline} />
          ) : (
            <UncertainStop timelineItem={timeline} />
          )}
          {index < completeTimeline.length - 1 && <Filler />}
        </>
      ))}
    </Flex>
  );
}
