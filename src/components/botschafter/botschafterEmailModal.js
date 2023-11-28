import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Switch,
  VStack,
  useToast,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useState } from "react";
import { HiOutlineInformationCircle } from "react-icons/hi2";

function BotschafterEmailModal({ onClose, onOpen, isOpen, botschafter }) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [zusatzAngaben, setZusatzAngaben] = useState(false);
  const [allLetter, setAllLetter] = useState(false);

  async function sendBotEmail() {
    try {
      setLoading(true);
      const res = await fetch("/api/botschafter/botEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ botschafter, zusatzAngaben, allLetter }),
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
    <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Botschafter Email versenden</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Alert status="info">
            <AlertIcon />
            Der Botschafter ({botschafter.email}) erhält eine Email mit einem
            PDF Anhang aller verknüpften Bewerbungen die den Status "1111" oder
            "Ausland 1111" haben.{" "}
          </Alert>
          <VStack spacing={6} my={6}>
            <FormControl>
              <FormLabel>Zusatzangaben ausgeben</FormLabel>
              <Switch
                colorScheme="green"
                name="zusatzAngaben"
                type="text"
                onChange={(e) => setZusatzAngaben(e.target.checked)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>
                Status ignorieren (Alle verknüpften Bewerbungen ausgegeben)
              </FormLabel>
              <Switch
                colorScheme="green"
                name="allLetter"
                type="text"
                onChange={(e) => setAllLetter(e.target.checked)}
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
