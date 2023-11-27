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
  FormControl,
  FormLabel,
  Switch,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

function BotschafterEmailModal({
  onClose,
  onOpen,
  isOpen,
  onSubmit,
  botschafter,
}) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [zusatzAngaben, setZusatzAngaben] = useState(false);

  async function sendBotEmail() {
    try {
      setLoading(true);
      const res = await fetch("/api/botschafter/botEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ botschafter, zusatzAngaben }),
      });
      if (res.status != 200) {
        console.log("BotEmail Error");
        setLoading(false);
        toast({
          title: "Ein Fehler ist aufgetreten",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      } else {
        setLoading(false);
        const resData = await res.json();
        console.log("resData", resData);
        onClose();
        toast({
          title: `Email ${resData.botschafter.email} versendet.`,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log("api fetch error");
      console.error("sendConfirmEmail Error: ", error);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Botschafter Email versenden</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={6} my={4}>
            <FormControl>
              <FormLabel>Zusatzangaben ausgeben</FormLabel>
              <Switch
                colorScheme="green"
                name="zusatzAngaben"
                type="text"
                onChange={(e) => setZusatzAngaben(e.target.checked)}
              />
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
            isDisabled={loading}
          >
            Schliessen
          </Button>
          <Button
            size={"md"}
            variant="outline"
            colorScheme="green"
            onClick={sendBotEmail}
            isLoading={loading}
          >
            Email versenden
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default BotschafterEmailModal;
