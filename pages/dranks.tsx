import Link from "next/link";
import { getDranks } from "../api";

type DrankOrder = { name: string; amounts: number[] };

type DranksData = {
  metadata: { header: string[] };
  rows: DrankOrder[];
};

interface Props {
  dranks: DranksData;
}

function Dranks({ dranks }: Props) {
  const { metadata, rows } = dranks;
  return (
    <main>
      <h1>Drikkeoversikt</h1>
      <nav>
        <Link href="/">
          <a>Program</a>
        </Link>
      </nav>
      <a
        href="https://docs.google.com/spreadsheets/d/11HKEo7IeUHuAzFgqS0FYWnQiaLSAvxFk9Fe4DWnttEE/edit#gid=0"
        target="_blank"
        rel="noreferrer"
      >
        Legg inn drikke
      </a>
      <table>
        <thead>
          <tr>
            <th></th>
            {metadata.header.map((place) => (
              <th key={place}>{place}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <Row key={row.name + index} name={row.name} amounts={row.amounts} />
          ))}
        </tbody>
      </table>
    </main>
  );
}

function Row({ name, amounts }: DrankOrder) {
  return (
    <tr>
      <td>{name}</td>
      {amounts.map((amount, index) => (
        <td key={name + amount + index}>{amount}</td>
      ))}
    </tr>
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
