import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { DrankOrder, DranksData } from "../models/drank";

export default function DrinkTable({ drankData }: { drankData: DranksData }) {
  const cleanedRows = drankData.rows.filter(
    (row) => !!row.name && !row.name.startsWith("PS:")
  );
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
            <Row key={row.name + index} name={row.name} amounts={row.amounts} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

function Row({ name, amounts }: DrankOrder) {
  return (
    <Tr>
      <Td>{name}</Td>
      {amounts.map((amount, index) => (
        <Td key={name + amount + index}>{amount}</Td>
      ))}
    </Tr>
  );
}
