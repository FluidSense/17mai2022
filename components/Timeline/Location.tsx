import { Box, Button, Text } from "@chakra-ui/react";
import { Place } from "../../models/place";
import { Timeline } from "../../models/timeline";
import { TimelineIcon } from "../TimelineIcon";

interface Props {
  timeline: Timeline;
  place?: Place;
  handleClick: () => void;
}

export default function TimelineLocation({
  timeline,
  place,
  handleClick,
}: Props) {
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
    <Button
      display="grid"
      gridTemplateColumns={"1fr 2fr 3fr"}
      gridTemplateRows={"repeat(3, 1fr)"}
      shadow="sm"
      borderWidth="1px"
      margin="2% 0"
      padding="5%"
      justifyContent="center"
      alignItems="center"
      backgroundColor={isCompleted ? completedColor : "transparent"}
      borderRadius="10px"
      boxSizing="content-box"
      position="relative"
      height="fit-content"
      onClick={handleClick}
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
      <Text gridColumn="3" gridRow="1">
        {place?.displayName}
      </Text>
      <Text
        gridColumn="3"
        gridRow="2 / span 2"
        fontWeight="normal"
        style={{ wordWrap: "break-word", whiteSpace: "normal" }}
      >
        {timeline.description}
      </Text>
      {isOngoing && <Loader />}
    </Button>
  );
}

function Loader() {
  return (
    <Box className={"meter"}>
      <span></span>
    </Box>
  );
}
