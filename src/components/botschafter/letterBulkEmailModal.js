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
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from "@chakra-ui/react";
import { useState } from "react";
import { render } from "@react-email/render";
import LetterEmail1 from "@/email/LetterEmail1";

function LetterBulkEmailModal({ onClose, onOpen, isOpen, kampagne }) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [testMode, setTestMode] = useState(false);
  const [emailVersion, setEmailVersion] = useState("3");
  const [emailVersionError, setEmailVersionError] = useState(false);

  const emailText3 = render(<LetterEmail1 letter={{}} />, {
    plainText: true,
  });

  async function sendBotEmails() {
    try {
      setLoading(true);
      if (emailVersion == "") {
        throw "Keine Email Version ausgewählt.";
      }
      const res = await fetch("/api/botschafter/letterBulkEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kampagneId: kampagne.id,
          testMode: testMode,
          emailVersion: emailVersion,
        }),
      });
      if (res.status != 200) {
        console.log("LetterEmail Error");
        setLoading(false);
        toast({
          title: "Ein Fehler ist aufgetreten",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      } else {
        setLoading(false);
        setEmailVersion("");
        setEmailVersionError(false);
        setTestMode(false);
        const resData = await res.json();
        console.log("resData", resData);
        onClose();
        toast({
          title: `Emails an ${resData.mails.length} Projekte versendet.`,
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
        <ModalHeader>Bewerbungen Emails versenden</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Alert status="info">
            <AlertIcon />
            Alle geförderten Projekte und deren Ansprechpartner werden
            angeschrieben inkl. PDF Anhänge.
          </Alert>
          <VStack mt={6} alignItems={"flex-start"}>
            <FormControl mb={4}>
              <FormLabel>Email Version</FormLabel>
              <Stack direction="column" gap={4}>
                <RadioGroup onChange={setEmailVersion} value={emailVersion}>
                  <Stack direction="column">
                    <Radio
                      isInvalid={emailVersionError}
                      onChange={() => setEmailVersionError(false)}
                      value="3"
                    >
                      <Stack direction={"row"} alignItems={"center"}>
                        <Text> PT_Gratulation Preisträger</Text>
                        <Popover placement="right">
                          <PopoverTrigger>
                            <Button size={"xs"}>Vorschau</Button>
                          </PopoverTrigger>
                          <PopoverContent
                            minW={{ base: "100%", lg: "max-content" }}
                          >
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>
                              {" "}
                              PT_Gratulation Preisträger
                            </PopoverHeader>
                            <PopoverBody>
                              <Text whiteSpace="pre-line">{emailText3}</Text>
                            </PopoverBody>
                          </PopoverContent>
                        </Popover>
                      </Stack>
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Stack>
              {emailVersionError && (
                <Alert status="error" mt={4}>
                  <AlertIcon />
                  <AlertDescription>
                    Keine Email Version ausgewählt.
                  </AlertDescription>
                </Alert>
              )}
            </FormControl>
            <Divider my={4} />
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
              {kampagne.letters
                .filter((l) =>
                  ["1111", "5000", "ausland1111", "ausland5000"].includes(
                    l.status
                  )
                )
                .map((letter) => {
                  return (
                    <ListItem alignItems={"flex-start"} key={letter.id}>
                      <Text as={"b"}>
                        {letter.emailProjekt} | ID: {letter.id}
                      </Text>
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

export default LetterBulkEmailModal;
