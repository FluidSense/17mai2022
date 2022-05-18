import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
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
  );

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
            <Tr key={`${person.phone}`}>
              <Td>{person.name}</Td>
              <Td>{person.phone}</Td>
              {sectionNames.map((name, index) => {
                const costForSection = person.costs.find(
                  (c) => c.sectionName === name
                );

                if (costForSection) {
                  return (
                    <Td key={`${name}-{${index}-${person.phone}`}>
                      {costForSection.sectionCost}
                    </Td>
                  );
                }
                return <Td key={`${name}-{${index}-${person.phone}`}>NA</Td>;
              })}
              <Td isNumeric>{person.totalCost}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default CostTable;
