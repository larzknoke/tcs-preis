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

function TraegerEditModal({ onClose, isOpen, letter }) {
  const toast = useToast();

  async function onSubmit() {
    console.log("submit: ", status);
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
      console.log("resData: ", resData);
      toast({
        title: `Status geändert`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      onClose();
      router.replace(router.asPath);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Status bearbeiten</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={6} my={4}>
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
            onClick={onClose}
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

export default TraegerEditModal;
