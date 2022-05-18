import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  TableContainer,
  Table,
  Th,
  Thead,
  Tr,
  Tbody,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import { section } from "./types";

type PurchasesProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedSection: section;
};

const Purchases = (props: PurchasesProps) => {
  const { isOpen, onClose, selectedSection } = props;

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Kjøp på balkongen</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Produktnavn</Th>
                    <Th>Pris</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {selectedSection.purchases.map((item, index) => (
                    <Tr key={`${item.itemName}-${index}`}>
                      <Td>{item.itemName}</Td>
                      <Td>{item.amount}</Td>
                    </Tr>
                  ))}
                </Tbody>
                <TableCaption>Sum: {selectedSection.sectionCost}</TableCaption>
              </Table>
            </TableContainer>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Purchases;
