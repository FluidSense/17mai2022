import { GoogleSpreadsheet } from "google-spreadsheet";
import fs from "fs";
import { Timeline, TimelineDAO, timelineFromDAO } from "./models/timeline";
import { PlaceDAO } from "./models/place";

const auth_file = fs.readFileSync("./mai2022-349817-53b1c5885a5c.json");
const auth_data = JSON.parse(auth_file.toString());
const doc = new GoogleSpreadsheet(
  "1OCGy1rjHKagj7RdVOcbpCAAJCg-GI78f1lUTH60B5Ho"
);

let initialized = false;

async function init() {
  if (!initialized) {
    await doc.useServiceAccountAuth({
      client_email: auth_data.client_email,
      private_key: auth_data.private_key,
    });
    await doc.loadInfo();
    initialized = true;
  }
}

export const getTimeline = async (): Promise<TimelineDAO[]> => {
  await init();
  const sheet = doc.sheetsByTitle["Timeline"];
  const rows = await sheet.getRows();
  return rows.map((row) => {
    const assumeRow = row as unknown as TimelineDAO;
    return {
      time: assumeRow.time,
      place: assumeRow.place,
      type: assumeRow.type,
    };
  });
};

export const getPlaces = async (): Promise<PlaceDAO[]> => {
  await init();
  const sheet = doc.sheetsByTitle["Places"];
  const rows = await sheet.getRows();
  return rows.map((row) => ({
    name: row["name"] || "",
    lat: row["lat"] || "",
    long: row["long"] || "",
    url: row["url"] || "",
    description: row["description"] || "",
    displayName: row["displayName"] || "",
  }));
};
