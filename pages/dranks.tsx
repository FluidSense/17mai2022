import Link from "next/link";
import { getDranks } from "../api";
import DrinkTable from "../components/DrinkTable";
import Header from "../components/Header";
import { DranksData } from "../models/drank";
import { ExternalLinkIcon } from "@chakra-ui/icons";

interface Props {
  dranks: DranksData;
}

function Dranks({ dranks }: Props) {
  return (
    <main>
      <Header pageTitle="Drikkeoversikt" />
      <Link href="https://docs.google.com/spreadsheets/d/11HKEo7IeUHuAzFgqS0FYWnQiaLSAvxFk9Fe4DWnttEE/edit#gid=0">
        <a
          style={{ margin: "5% 5% 0", display: "block" }}
          target="_blank"
          rel="noreferrer"
        >
          Legg inn drikke <ExternalLinkIcon mx="2px" />
        </a>
      </Link>
      <DrinkTable drankData={dranks} />
    </main>
  );
}

export async function getServerSideProps() {
  const dranks = await getDranks();
  console.log("dranks", dranks);
  return {
    props: {
      dranks,
    },
  };
}
export default Dranks;
