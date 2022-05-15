import { Box, Text } from "@chakra-ui/react";
import { time } from "console";
import { getPlaceFromPlaceName, Place } from "../../models/place";
import { Timeline } from "../../models/timeline";
import { TimelineIcon } from "../TimelineIcon";

interface Props {
  timeline: Timeline;
  places: Place[];
}

export default function TimelineLocation({ timeline, places }: Props) {
  const datetimeToString = (datetime?: Date) =>
    datetime?.toLocaleTimeString("no-NB").substring(0, 5);

  const completedColor = "#5FDBA7";
  const isCompleted =
    timeline.departure && timeline.departure.getTime() < Date.now();
  const isOngoing =
    timeline.arrival &&
    timeline.arrival.getTime() < Date.now() &&
    timeline.departure &&
    timeline.departure.getTime() > Date.now();
  return (
    <Box
      display="grid"
      gridTemplateColumns={"1fr 2fr 3fr"}
      gridTemplateRows={"repeat(3, 1fr)"}
      shadow="sm"
      borderWidth="1px"
      margin="2% 0"
      padding="5%"
      justifyContent="center"
      alignItems="center"
      backgroundColor={isCompleted ? completedColor : undefined}
      borderRadius="10px"
      boxSizing="content-box"
      position="relative"
    >
      <TimelineIcon style={{ gridRow: 1 }} timelineType={timeline.type} />
      <TimelineIcon style={{ gridRow: 2 }} timelineType="wait" />
      <TimelineIcon style={{ gridRow: 3 }} timelineType={timeline.type} />
      <Text gridColumn={2} gridRow="1">
        {datetimeToString(timeline.arrival)}
      </Text>
      <Text gridColumn={2} gridRow="3">
        {datetimeToString(timeline.departure)}
      </Text>
      <Text gridColumn="3" gridRow="1 / span 3">
        {getPlaceFromPlaceName(places, timeline.placeId)?.displayName}
      </Text>
      {isOngoing && <Loader />}
    </Box>
  );
}

function Loader() {
  return (
    <Box className={"meter"}>
      <span></span>
    </Box>
  );
}
