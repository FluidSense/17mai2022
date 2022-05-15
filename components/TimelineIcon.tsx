import { Timeline, TimelineType } from "../models/timeline";
import { GoLocation } from "react-icons/go";
import { FaRegCircle, FaInfoCircle } from "react-icons/fa";
import { VscKebabVertical } from "react-icons/vsc";
import { SVGAttributes } from "react";

interface Props extends SVGAttributes<SVGElement> {
  timelineType: TimelineType;
}

export const TimelineIcon = ({ timelineType, ...props }: Props) => {
  switch (timelineType) {
    case "arrival":
    case "departure":
    case "location":
      return <GoLocation style={{ gridColumn: "1" }} {...props} />;
    case "wait":
      return <StraightLine style={{ gridColumn: "1" }} {...props} />;
    case "via":
      return <FaRegCircle style={{ gridColumn: "1" }} {...props} />;
    case "walk":
      return <VscKebabVertical style={{ gridColumn: "1" }} {...props} />;
    case "default":
      return <FaInfoCircle style={{ gridColumn: "1" }} {...props} />;
    default:
      return <FaInfoCircle style={{ gridColumn: "1" }} {...props} />;
  }
};

const StraightLine = (props: SVGAttributes<SVGElement>) => {
  return (
    <svg viewBox="0 0 130 130" height="16px" {...props}>
      <line
        x1="65"
        y1="0"
        x2="65"
        y2="130"
        stroke="black"
        strokeWidth="12"
      ></line>
    </svg>
  );
};
