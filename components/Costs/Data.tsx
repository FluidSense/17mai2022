import CostTable from "./CostTable";
import { csvType } from "./types";

type DataProps = {
  data: csvType[];
};

const Data = (props: DataProps) => {
  const { data } = props;

  if (!data.length) {
    return <>Waiting for CSV...</>;
  }
  return <CostTable data={data} />;
};

export default Data;
