import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import CostTableLine from "./CostTableLine";
import { csvType } from "./types";
import { transformParseResult } from "./utils";

type CostTableProps = {
  data: csvType[];
};

const CostTable = (props: CostTableProps) => {
  const { data } = props;

  const transformed = transformParseResult(data);

  const sectionNames = Array.from(
    new Set(
      data
        .filter((d) => d.menu_info)
        .map((d) => JSON.parse(d.menu_info).sectionName)
    )
  ) as string[];

  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Kostnadsoversikt for balkong til balkong</TableCaption>
        <Thead>
          <Tr>
            <Th>Navn</Th>
            <Th>Nummer</Th>
            {sectionNames.map((name, index) => (
              <Th key={`${name}-{${index}`}>{name}</Th>
            ))}
            <Th isNumeric>Total kostnad</Th>
          </Tr>
        </Thead>
        <Tbody>
          {transformed.map((person) => (
            <CostTableLine
              person={person}
              sectionNames={sectionNames}
              key={`${person.phone}`}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default CostTable;
