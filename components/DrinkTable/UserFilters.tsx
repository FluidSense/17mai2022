import { Button, Flex } from "@chakra-ui/react";

interface UserFilters {
  showOnlyOwn: boolean;
  showOnlyPlace: boolean;
  setOnlyOwn: (bool: boolean) => void;
  setOnlyPlace: (bool: boolean) => void;
}

export function LoggedInFilters(props: UserFilters) {
  function toggleOnlyOwn(_e: any) {
    props.setOnlyOwn(!props.showOnlyOwn);
    props.setOnlyPlace(false);
  }

  function toggleOnlyPlace(_e: any) {
    props.setOnlyPlace(!props.showOnlyPlace);
    props.setOnlyOwn(false);
  }

  const activeGreen = "#5FDBA7";

  return (
    <Flex justifyContent="space-evenly">
      <Button
        style={props.showOnlyOwn ? { backgroundColor: activeGreen } : undefined}
        onClick={toggleOnlyOwn}
      >
        Vis kun min drikke
      </Button>
      <Button
        style={
          props.showOnlyPlace ? { backgroundColor: activeGreen } : undefined
        }
        onClick={toggleOnlyPlace}
      >
        Vis kun drikke hos meg
      </Button>
    </Flex>
  );
}
