import { Timeline } from "../models/timeline";
import { GoLocation } from "react-icons/go";
import { FaRegCircle, FaInfoCircle } from "react-icons/fa";

interface Props {
  timeline: Timeline;
}

export const TimelineIcon = ({ timeline }: Props) => {
  switch (timeline.type) {
    case "arrival":
      return <GoLocation />;
    case "departure":
      return <GoLocation />;
    case "via":
      return <FaRegCircle />;
    case "default":
      return <FaInfoCircle />;
  }
};
