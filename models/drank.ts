import { User } from "./user";

export type DrankOrder = { name: string; amounts: number[] };

export type DranksData = {
  metadata: { header: string[] };
  rows: DrankOrder[];
};

export function applyUserFilters(
  dranks: DranksData,
  user: User,
  showOnlyOwn: boolean,
  showOnlyPlace: boolean
): DranksData {
  if (showOnlyOwn)
    return {
      ...dranks,
      rows: dranks.rows.filter((row) => isRowOwner({ row, user })),
    };
  if (showOnlyPlace) {
    const commaseparatedPlaces = user.drankPlace
      ?.split(",")
      .map((place) => place.trim())
      .filter(Boolean);
    const indicesOfPlace = commaseparatedPlaces?.map((place) =>
      dranks.metadata.header.findIndex((name) => name === place)
    );
    if (indicesOfPlace?.every((index) => index === -1)) {
      return {
        metadata: {
          header: ["Feil"],
        },
        rows: [
          {
            name: "Din bruker er ikke koblet opp mot et sted. Mas på Johannes.",
            amounts: [],
          },
        ],
      };
    } else {
      return {
        metadata: {
          header: commaseparatedPlaces || [],
        },
        rows: dranks.rows.map((row) => ({
          name: row.name,
          amounts:
            indicesOfPlace
              ?.map((index) => row.amounts[index])
              .filter(Boolean) || [],
        })),
      };
    }
  }
  return dranks;
}

function isRowOwner({ row, user }: { row: DrankOrder; user: User }) {
  return user.drankName == row.name;
}
