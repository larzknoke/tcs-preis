import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";

function BotschafterDeleteModal({
  onClose,
  isOpen,
  botschafter,
  onSubmitDelete,
  loading,
}) {
  const router = useRouter();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Botschafter {botschafter?.vorname} {botschafter?.name} löschen
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Wollen Sie den Botschafter unwiderruflich löschen?
        </ModalBody>

        <ModalFooter>
          <Button
            size={"md"}
            colorScheme="gray"
            mr={3}
            onClick={onClose}
            variant={"outline"}
            isDisabled={loading}
          >
            Abbrechen
          </Button>
          <Button
            size={"md"}
            variant="outline"
            colorScheme="red"
            onClick={() => onSubmitDelete(botschafter?.id)}
            isLoading={loading}
          >
            Löschen
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default BotschafterDeleteModal;
