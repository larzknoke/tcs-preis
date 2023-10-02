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

function FileDeleteModal({ onClose, isOpen, file, deleteFile, loading }) {
  const router = useRouter();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Datei "{file?.title}" löschen</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Wollen Sie die Datei{" "}
          <Text as={"b"}>
            "{file?.title}" ({file?.typ})
          </Text>{" "}
          wirklich unwiderruflich löschen?
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
            onClick={() => deleteFile(file?.id)}
            isLoading={loading}
          >
            Löschen
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default FileDeleteModal;
