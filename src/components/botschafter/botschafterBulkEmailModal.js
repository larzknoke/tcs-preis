import {
  Text,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  ModalCloseButton,
  VStack,
  useToast,
  Alert,
  AlertIcon,
  ListItem,
  OrderedList,
} from "@chakra-ui/react";
import { useState } from "react";

function BotschafterBulkEmailModal({ onClose, onOpen, isOpen, kampagnenBots }) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [zusatzAngaben, setZusatzAngaben] = useState(false);
  const [allLetter, setAllLetter] = useState(false);

  async function sendBotEmails() {
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
        <ModalHeader>Botschafter Emails versenden</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Alert status="info">
            <AlertIcon />
            Alle Botschafter und Botschafter-Ansprechpartner erhalten eine Email
            inkl. PDF mit der Übersicht der verknüpften Bewerbungen.
          </Alert>
          <VStack mt={6} alignItems={"flex-start"}>
            <Heading size={"md"}>Emails:</Heading>
            <OrderedList spacing={3} marginInlineStart={"2em"}>
              {kampagnenBots.map((bot) => {
                return (
                  <ListItem alignItems={"flex-start"}>
                    <Text as={"b"}>{bot.email}</Text>
                    {bot.botcontacts.map((botcontact) => {
                      return <Text>{botcontact.email}</Text>;
                    })}
                  </ListItem>
                );
              })}
            </OrderedList>
            {/* <FormControl>
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
            </FormControl> */}
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
            // onClick={sendBotEmails}
            isLoading={loading}
            isDisabled={true}
          >
            Email versenden
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default BotschafterBulkEmailModal;
