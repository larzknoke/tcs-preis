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

function UserDeleteModal({ onClose, isOpen, user, onSubmitDelete, loading }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Benutzer {user?.email} löschen</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Wollen Sie den Benutzer unwiderruflich löschen?</ModalBody>

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
            onClick={() => onSubmitDelete(user?.id)}
            isLoading={loading}
          >
            Löschen
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default UserDeleteModal;
