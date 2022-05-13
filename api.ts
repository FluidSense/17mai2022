import { GoogleSpreadsheet } from "google-spreadsheet";
import fs from "fs";
import { TimelineDAO } from "./models/timeline";
import { PlaceDAO } from "./models/place";

const auth_file = process.env.login_val || "";
const auth_data = JSON.parse(auth_file.toString());
const doc = new GoogleSpreadsheet(
  "1OCGy1rjHKagj7RdVOcbpCAAJCg-GI78f1lUTH60B5Ho"
);

const drank_doc = new GoogleSpreadsheet(
  "11HKEo7IeUHuAzFgqS0FYWnQiaLSAvxFk9Fe4DWnttEE"
);

let initialized = false;
let drank_initialized = false;
export let places: PlaceDAO[] = [];

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

async function init_drank() {
  if (!drank_initialized) {
    await drank_doc.useServiceAccountAuth({
      client_email: auth_data.client_email,
      private_key: auth_data.private_key,
    });
    await drank_doc.loadInfo();
    drank_initialized = true;
  }
}

export const getTimeline = async (): Promise<TimelineDAO[]> => {
  await init();
  const sheet = doc.sheetsByTitle["Timeline"];
  const rows = await sheet.getRows();
  return rows.map((row) => {
    const assumeRow = row as unknown as TimelineDAO;
    return {
      arrival: assumeRow.arrival,
      departure: assumeRow.departure,
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
// Load places into server memory
getPlaces().then((placeList) => (places = placeList));

export async function getDranks(): Promise<any> {
  await init_drank();
  const sheet = drank_doc.sheetsByIndex[0];
  const rows = await sheet.getRows();
  const placeNames = sheet.headerValues;
  return {
    metadata: {
      header: placeNames.filter((name) => !!name),
    },
    rows: rows.map((row) => {
      const [name, ...amounts]: string[] = row._rawData || [];
      return {
        name,
        amounts,
      };
    }),
  };
}
