import { Tr, Td } from "@chakra-ui/react";
import { transformedCostData } from "./types";

type CostTableLineProps = {
  person: transformedCostData;
  sectionNames: string[];
};

const CostTableLine = (props: CostTableLineProps) => {
  const { person, sectionNames } = props;

  return (
    <Tr>
      <Td>{person.name}</Td>
      <Td>{person.phone}</Td>
      {sectionNames.map((name, index) => {
        const costForSection = person.sections[name];

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
  );
};

export default CostTableLine;
