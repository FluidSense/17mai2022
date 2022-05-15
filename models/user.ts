import { DefaultUser } from "next-auth";

export type User = Omit<DefaultUser, "id"> & {
  ownerOfPlace?: string;
  drankName?: string;
  drankPlace?: string;
};
