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
    console.log("submit: ", status);
    const res = await fetch("/api/letter/updateStatus", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: letter.id, status: status }),
    });
    if (res.status != 200) {
      toast({
        title: "Ein Fehler ist aufgetreten",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      const resData = await res.json();
      console.log("resData: ", resData);
      toast({
        title: `Status geändert`,
        status: "success",
        duration: 9000,
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
                <option value="angenommen">Angenommen</option>
                <option value="offen">Offen</option>
                <option value="abgelehnt">Abgelehnt</option>
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
