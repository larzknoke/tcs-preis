import { saveAs } from "file-saver";

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
  FormControl,
  FormLabel,
  Switch,
  Divider,
  Textarea,
  Radio,
  RadioGroup,
  Stack,
  AlertDescription,
} from "@chakra-ui/react";
import { useState } from "react";

function BotschafterBulkEmailModal({
  onClose,
  onOpen,
  isOpen,
  kampagneId,
  kampagnenBots,
}) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [testMode, setTestMode] = useState(false);
  const [freitext, setFreitext] = useState("");
  const [emailVersion, setEmailVersion] = useState("");
  const [emailVersionError, setEmailVersionError] = useState(false);

  async function sendBotEmails() {
    try {
      setLoading(true);
      if (emailVersion == "") {
        throw "Keine Email Version ausgewählt.";
      }
      const res = await fetch("/api/botschafter/botBulkEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kampagneId: kampagneId,
          testMode: testMode,
          freitext: freitext,
          emailVersion: emailVersion,
        }),
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
        setFreitext("");
        setEmailVersion("");
        setEmailVersionError(false);
        setTestMode(false);
        const resData = await res.json();
        console.log("resData", resData);
        onClose();
        toast({
          title: `Emails an ${resData.mails.length} Botschafter versendet.`,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        let blob = new Blob(
          [resData.mails.map((mail) => JSON.stringify(mail, null, " "))],
          {
            type: "text/plain;charset=utf-8",
          }
        );
        saveAs(blob, `log.txt`);
      }
    } catch (error) {
      console.log("api fetch error");
      console.error("sendConfirmEmail Error: ", error);
      setEmailVersionError(true);
      setLoading(false);
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
            <FormControl mb={4}>
              <FormLabel>Email Version</FormLabel>
              <RadioGroup onChange={setEmailVersion} value={emailVersion}>
                <Stack direction="row">
                  <Radio
                    isInvalid={emailVersionError}
                    onChange={() => setEmailVersionError(false)}
                    value="1"
                  >
                    Erste
                  </Radio>
                  <Radio
                    isInvalid={emailVersionError}
                    onChange={() => setEmailVersionError(false)}
                    value="2"
                  >
                    Zweite
                  </Radio>
                  {/* <Radio
                    isInvalid={emailVersionError}
                    onChange={() => setEmailVersionError(false)}
                    value="3"
                  >
                    Dritte
                  </Radio> */}
                </Stack>
              </RadioGroup>
              {emailVersionError && (
                <Alert status="error" mt={4}>
                  <AlertIcon />
                  <AlertDescription>
                    Keine Email Version ausgewählt.
                  </AlertDescription>
                </Alert>
              )}
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Freitext</FormLabel>
              <Textarea
                name="freitext"
                placeholder="Text hier...."
                onChange={(e) => setFreitext(e.target.value)}
                minH={200}
              />
            </FormControl>
            <FormControl>
              <FormLabel>
                Test Modus (1x Beispiel Email an "stiftungspreis@tc-stiftung.de)
              </FormLabel>
              <Switch
                colorScheme="green"
                name="testMode"
                type="text"
                isChecked={testMode}
                onChange={(e) => setTestMode(e.target.checked)}
              />
            </FormControl>
            <Divider my={4} />
            <Heading size={"sm"}>Emails:</Heading>
            <OrderedList spacing={3} marginInlineStart={"2em"}>
              {kampagnenBots
                .filter((d) =>
                  d.letters.some((l) =>
                    ["1111", "5000", "ausland1111", "ausland5000"].includes(
                      l.status
                    )
                  )
                )
                .map((bot) => {
                  return (
                    <ListItem alignItems={"flex-start"} key={bot.id}>
                      <Text as={"b"}>
                        {bot.email} | ID: {bot.id}
                      </Text>
                      {bot.botcontacts.map((botcontact) => {
                        return (
                          <Text key={botcontact.id}>{botcontact.email}</Text>
                        );
                      })}
                    </ListItem>
                  );
                })}
            </OrderedList>
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
            onClick={sendBotEmails}
            isLoading={loading}
          >
            Email versenden
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default BotschafterBulkEmailModal;
