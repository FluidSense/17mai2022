import Header from "../components/Header";
import { DranksData } from "../models/drank";
import { getSession } from "next-auth/react";
import { NextPageContext } from "next";
import { User } from "../models/user";
import FileUploadButton from "../components/Costs/FileUpload";
import Papa from "papaparse";
import { csvType } from "../components/Costs/types";
import { useState } from "react";
import Data from "../components/Costs/Data";

interface Props {
  dranks: DranksData;
  user: User;
}

function Costs({ user }: Props) {
  const [data, setData] = useState<csvType[]>([]);

  const handleCsv = (files: File[]) => {
    const file = files[0]; // We only allow 1 file.
    Papa.parse<csvType>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setData(results.data);
      },
      encoding: "ISO-8859-1",
    });
  };

  return (
    <main>
      <Header pageTitle="Cost" user={user} />
      <Data data={data} />
      <FileUploadButton onChange={handleCsv} width="100%">
        Last opp CSV med transaksjoner
      </FileUploadButton>
    </main>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const { user } = (await getSession({ req: context.req })) || {};
  context.res?.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  return {
    props: {
      user: user || null,
    },
  };
}
export default Costs;
