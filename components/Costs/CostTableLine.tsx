import { Tr, Td, UseDisclosureReturn } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { section, transformedCostData } from "./types";

type CostTableLineProps = {
  person: transformedCostData;
  sectionNames: string[];
  modal: UseDisclosureReturn;
  setSelectedSection: Dispatch<SetStateAction<section | undefined>>;
};

const CostTableLine = (props: CostTableLineProps) => {
  const { person, sectionNames, modal, setSelectedSection } = props;

  const handleClick = (section: section) => {
    setSelectedSection(section);
    modal.onOpen();
  };

  return (
    <Tr>
      <Td>{person.name}</Td>
      <Td>{person.phone}</Td>
      {sectionNames.map((name, index) => {
        const section = person.sections[name];

        if (section) {
          return (
            <Td
              key={`${name}-{${index}-${person.phone}`}
              onClick={() => handleClick(section)}
              style={{ cursor: "pointer" }}
              _hover={{
                textDecoration: "underline",
              }}
            >
              {section.sectionCost}
            </Td>
          );
        }
        return <Td key={`${name}-{${index}-${person.phone}`}>0</Td>;
      })}
      <Td isNumeric>{person.totalCost}</Td>
    </Tr>
  );
};

export default CostTableLine;
