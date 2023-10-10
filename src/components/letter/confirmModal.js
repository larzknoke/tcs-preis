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
import { useRouter } from "next/router";
import Link from "next/link";

function ConfirmModal({ confirmOnClose, confirmIsOpen, letter }) {
  const router = useRouter();

  return (
    <Modal isOpen={confirmIsOpen} onClose={confirmOnClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Bewerbung bestätigen</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Hiermit wird die Bewerbung nachträglich bestätigt und der Bewerber (
            {letter.emailProjekt}) per Email benachrichtigt.
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button
            size={"md"}
            colorScheme="gray"
            mr={3}
            onClick={confirmOnClose}
            variant={"outline"}
          >
            Schliessen
          </Button>
          <Button
            as={Link}
            size={"md"}
            variant="outline"
            colorScheme="green"
            href={"/bewerbung/verify?verifyId=" + letter.verifyId}
          >
            Bestätigen
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ConfirmModal;
