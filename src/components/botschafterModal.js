import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  ModalCloseButton,
  Input,
  Select,
  FormControl,
  FormLabel,
  Switch,
  VStack,
} from "@chakra-ui/react";

function BotschafterModal({ botschafterOnClose, botschafterIsOpen }) {
  return (
    <Modal isOpen={botschafterIsOpen} onClose={botschafterOnClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Botschafter bearbeiten</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={6} my={4}>
            <FormControl>
              <FormLabel htmlFor="email-alerts" mb="0">
                Botschafter
              </FormLabel>
              <Select placeholder="Botschafter wählen...">
                <option value="option1">Yvonne Bauer</option>
                <option value="option2">Anja Tollhausen</option>
                <option value="option3">Max Mustermann</option>
              </Select>
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            size={"md"}
            colorScheme="gray"
            mr={3}
            onClick={botschafterOnClose}
            variant={"outline"}
          >
            Schliessen
          </Button>
          <Button size={"md"} variant="outline" colorScheme="green">
            Speichern
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default BotschafterModal;
