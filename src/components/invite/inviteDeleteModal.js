import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";

function InviteDeleteModal({ onClose, isOpen, inviteID, deleteInvite }) {
  const router = useRouter();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Anmeldung löschen</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Wollen Sie die Anmeldung {inviteID || ""} wirklich unwiderruflich
          löschen?
        </ModalBody>

        <ModalFooter>
          <Button
            size={"md"}
            colorScheme="gray"
            mr={3}
            onClick={onClose}
            variant={"outline"}
          >
            Abbrechen
          </Button>
          <Button
            size={"md"}
            variant="outline"
            colorScheme="red"
            onClick={() => deleteInvite(inviteID)}
          >
            Löschen
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default InviteDeleteModal;
