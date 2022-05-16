import { Container, Spacer, Text } from "@chakra-ui/react";
import CostTable from "./CostTable";
import { csvType } from "./types";

type DataProps = {
  data: csvType[];
};

const Data = (props: DataProps) => {
  const { data } = props;

  if (!data.length) {
    return (
      <Container style={{ paddingBottom: "20px", textAlign: "center" }}>
        <Text>
          Last opp en CSV med transaksjonsdata for å se kostnadsoversikten
        </Text>
      </Container>
    );
  }
  return <CostTable data={data} />;
};

export default Data;
