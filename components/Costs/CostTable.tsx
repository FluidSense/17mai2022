import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import CostTableLine from "./CostTableLine";
import Purchases from "./Purchases";
import { csvType, section } from "./types";
import { transformParseResult } from "./utils";

type CostTableProps = {
  data: csvType[];
};

const CostTable = (props: CostTableProps) => {
  const { data } = props;
  const modal = useDisclosure();
  const [selectedSection, setSelectedSection] = useState<section>();

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
              modal={modal}
              setSelectedSection={setSelectedSection}
            />
          ))}
        </Tbody>
      </Table>
      {modal.isOpen && selectedSection ? (
        <Purchases
          isOpen={modal.isOpen}
          onClose={modal.onClose}
          selectedSection={selectedSection}
        />
      ) : (
        <></>
      )}
    </TableContainer>
  );
};

export default CostTable;
