export type Timeline = {
  arrival?: Date;
  departure?: Date;
  placeId: string;
  type: TimelineType;
  description?: string;
};

export type TimelineDTO = {
  arrival: string;
  departure: string;
  place: string;
  type: string;
  description: string;
};

export type TimelineType =
  | "arrival"
  | "departure"
  | "location"
  | "via"
  | "default"
  | "walk"
  | "wait";

function isTimelineTypeFromCMS(obj: any): obj is TimelineType {
  const valAsString = String(obj);
  return (
    valAsString === "location" ||
    valAsString === "via" ||
    valAsString === "default"
  );
}

export function timelineFromDTO({
  arrival,
  departure,
  place,
  type,
  description,
}: TimelineDTO): Timeline {
  return {
    arrival: !!arrival ? new Date(`2022-05-17T${arrival}`) : undefined,
    departure: !!departure ? new Date(`2022-05-17T${departure}`) : undefined,
    type: isTimelineTypeFromCMS(type) ? type : "default",
    placeId: place,
    description: !!description ? description : undefined,
  };
}

export const isTimeline = (obj: any): obj is Timeline => !!obj.type;
