import {
  SimpleGrid,
  GridItem,
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
  Textarea,
  Divider,
  Text,
} from "@chakra-ui/react";

function ShowNoteModal({ note, isOpen, onClose }) {
  const toast = useToast();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Notiz ID: {note.id}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading size={"md"}>{note.title}</Heading>
            <Divider my={4} />
            <Text>{note.content}</Text>
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
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ShowNoteModal;
