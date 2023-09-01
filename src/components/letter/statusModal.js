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
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";

function StatusModal({ statusOnClose, statusIsOpen, letter }) {
  const router = useRouter();
  const toast = useToast();
  const [status, setStatus] = useState(letter.status);

  async function onSubmit() {
    const res = await fetch("/api/letter/updateStatus", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: letter.id, status: status }),
    });
    if (res.status == 401) {
      toast({
        title: "Sie sind nicht berechtigt diese Funktion auszuführen.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } else if (res.status != 200) {
      toast({
        title: "Ein Fehler ist aufgetreten",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } else {
      const resData = await res.json();
      toast({
        title: `Status geändert`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      statusOnClose();
      router.replace(router.asPath);
    }
  }

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
              <Select
                placeholder="Status wählen..."
                value={status || letter.status}
                onChange={(event) => setStatus(event.target.value)}
              >
                <option value="offen">Offen</option>
                <option value="1000">1000,- Förderung</option>
                <option value="5000">5000,- Förderung</option>
                <option value="ausland">Auslandsprojekt</option>
                <option value="abgelehnt">Abgelehnt</option>
              </Select>
            </FormControl>
            {/* <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="email-alerts" mb="0">
                Email Benachrichtigung?
              </FormLabel>
              <Switch id="email-alerts" colorScheme="green" />
            </FormControl> */}
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
          <Button
            size={"md"}
            variant="outline"
            colorScheme="green"
            onClick={onSubmit}
          >
            Speichern
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default StatusModal;
