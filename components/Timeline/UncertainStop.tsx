import { Flex, Text } from "@chakra-ui/react";
import { Timeline } from "../../models/timeline";
import { TimelineIcon } from "../TimelineIcon";

interface Props {
  timelineItem: Timeline;
}

export default function UncertainStop({ timelineItem }: Props) {
  return (
    <Flex alignItems="center" margin="2% 5%" gap="2em">
      <TimelineIcon timelineType={timelineItem.type} />
      <Text>{timelineItem.placeId}</Text>
    </Flex>
  );
}
