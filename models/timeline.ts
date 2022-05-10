export type Timeline = {
  time?: Date;
  placeId: string;
  type: TimelineType;
};

export type TimelineDAO = {
  time: string;
  place: string;
  type: string;
};

type TimelineType = "arrival" | "departure" | "via" | "default";

function isTimelineType(obj: any): obj is TimelineType {
  const valAsString = String(obj);
  return (
    valAsString === "arrival" ||
    valAsString === "departure" ||
    valAsString === "via" ||
    valAsString === "default"
  );
}

export function timelineFromDAO({ time, place, type }: TimelineDAO): Timeline {
  return {
    time: !!time ? new Date(`2022-05-17T${time}`) : undefined,
    type: isTimelineType(type) ? type : "default",
    placeId: place,
  };
}

export const isTimeline = (obj: any): obj is Timeline => !!obj.type;
