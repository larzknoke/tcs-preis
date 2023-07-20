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

function StatusModal({ statusOnClose, statusIsOpen }) {
  return (
    <Modal isOpen={statusIsOpen} onClose={statusOnClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Status bearbeiten</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={6} my={4}>
            <FormControl>
              <FormLabel htmlFor="email-alerts" mb="0">
                Status
              </FormLabel>
              <Select placeholder="Status wählen...">
                <option value="option1">Angenommen</option>
                <option value="option2">Offen</option>
                <option value="option3">Abgelehnt</option>
              </Select>
            </FormControl>
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="email-alerts" mb="0">
                Email Benachrichtigung?
              </FormLabel>
              <Switch id="email-alerts" colorScheme="green" />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            size={"md"}
            colorScheme="gray"
            mr={3}
            onClick={statusOnClose}
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

export default StatusModal;
