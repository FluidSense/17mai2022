import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
} from "@chakra-ui/react";
import { DrankOrder, DranksData } from "../../models/drank";

export default function DrinkTable({ drankData }: { drankData: DranksData }) {
  const cleanedRows = drankData.rows.filter(
    (row) => !!row.name && !row.name.startsWith("PS:")
  );
  if (cleanedRows.length === 1) {
    return <ReversedTable drankData={drankData} />;
  }
  return (
    <TableContainer overflowX="scroll">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th></Th>
            {drankData.metadata.header.map((title) => (
              <Th key={title}>{title}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {cleanedRows.map((row, index) => (
            <Row
              key={row.name + index}
              name={row.name}
              amounts={row.amounts}
              columns={drankData.metadata.header.length}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

function Row({ name, amounts, columns }: DrankOrder & { columns: number }) {
  return (
    <Tr>
      <Td>
        <Text fontWeight={"semibold"}>{name}</Text>
      </Td>
      {amounts.map((amount, index) => (
        <Td key={name + amount + index}>{amount}</Td>
      ))}
    </Tr>
  );
}

/* 
Table for when you only view 1 row, with multiple headers. 
We then flip the table.
*/
function ReversedTable({ drankData }: { drankData: DranksData }) {
  const cleanedRows = drankData.rows.filter(
    (row) => !!row.name && !row.name.startsWith("PS:")
  );
  const row = drankData.rows[0];
  return (
    <TableContainer overflowX="scroll">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th></Th>
            <Th>{row.name}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {drankData.metadata.header.map((title, index) => (
            <Row
              key={title}
              name={title}
              amounts={[row.amounts[index]]}
              columns={1}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
