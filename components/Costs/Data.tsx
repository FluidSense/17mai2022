import { Container, Spinner } from "@chakra-ui/react";
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
        <Spinner />
      </Container>
    );
  }
  return <CostTable data={data} />;
};

export default Data;
