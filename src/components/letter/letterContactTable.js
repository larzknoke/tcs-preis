import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Button,
  Text,
  Stack,
  StackDivider,
  Icon,
  Tooltip,
  HStack,
  GridItem,
  Alert,
  AlertIcon,
  AlertDescription,
  VStack,
  IconButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  HiOutlineDocumentText,
  HiUserPlus,
  HiMiniDevicePhoneMobile,
  HiOutlineEnvelope,
  HiOutlineUserCircle,
  HiOutlineClipboardDocumentList,
  HiOutlineFolderOpen,
  HiOutlineTrash,
} from "react-icons/hi2";
import NewLettercontactModal from "../lettercontact/newLettercontactModal";
import EditLettercontactModal from "../lettercontact/editLettercontactModal";
import { useRouter } from "next/router";
import { useState } from "react";

function LetterContactTable({ letter }) {
  const [selectedLettercontact, setSelectedLettercontact] = useState({});

  const {
    isOpen: lettercontactIsOpen,
    onOpen: lettercontactOnOpen,
    onClose: lettercontactOnClose,
  } = useDisclosure();
  const {
    isOpen: editLettercontactIsOpen,
    onOpen: editLettercontactOnOpen,
    onClose: editLettercontactOnClose,
  } = useDisclosure();
  const toast = useToast();
  const router = useRouter();

  async function deleteLettercontact(id) {
    const resData = await fetch("/api/lettercontact?id=" + id, {
      method: "DELETE",
    });
    if (resData.status != 200) {
      toast({
        title: "Ein Fehler ist aufgetreten",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } else {
      // const resData = await res.json();
      toast({
        title: `Ansprechpartner gelöscht.`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      router.replace(router.asPath);
    }
  }

  return (
    <Card>
      <CardHeader>
        <HStack justifyContent={"space-between"}>
          <Heading
            size="sm"
            color="gray.500"
            fontWeight={"600"}
            textTransform={"uppercase"}
          >
            Bewerbung Ansprechpartner
          </Heading>
          <Button
            onClick={lettercontactOnOpen}
            leftIcon={<HiUserPlus />}
            colorScheme="green"
            variant="ghost"
          >
            Neuer Ansprechpartner
          </Button>
          <NewLettercontactModal
            letter={letter}
            onClose={lettercontactOnClose}
            isOpen={lettercontactIsOpen}
          />
          <EditLettercontactModal
            lettercontact={selectedLettercontact}
            isOpen={editLettercontactIsOpen}
            onClose={editLettercontactOnClose}
          />
        </HStack>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          {letter && letter.lettercontacts.length > 0 ? (
            letter.lettercontacts.map((lettercontact) => {
              return (
                <HStack
                  justify={"space-between"}
                  gap={6}
                  key={lettercontact.id}
                >
                  <VStack alignItems={"self-start"}>
                    <HStack as={"b"} fontSize={"lg"} gap={4}>
                      <Text color={"gray.500"}>{lettercontact.id}</Text>
                      <Text>
                        {lettercontact.anrede} {lettercontact.name}
                      </Text>
                    </HStack>
                    <VStack
                      as={"span"}
                      color={"gray.400"}
                      alignItems={"self-start"}
                    >
                      <HStack gap={6}>
                        <HStack>
                          <Icon
                            as={HiMiniDevicePhoneMobile}
                            color={"gray.500"}
                          />
                          <Text>{lettercontact.telefon}</Text>
                        </HStack>
                        <HStack>
                          <Icon as={HiOutlineEnvelope} color={"gray.500"} />
                          <Text>{lettercontact.email}</Text>
                        </HStack>
                        <HStack>
                          <Icon as={HiOutlineUserCircle} color={"gray.500"} />
                          <Text>{lettercontact.funktion}</Text>
                        </HStack>
                      </HStack>
                      {lettercontact.notiz.length > 0 && (
                        <HStack alignItems={"self-start"}>
                          <Icon
                            as={HiOutlineClipboardDocumentList}
                            mt={1}
                            color={"gray.500"}
                          />
                          <Text as={"span"}>{lettercontact.notiz}</Text>
                        </HStack>
                      )}
                    </VStack>
                  </VStack>
                  <HStack>
                    <Tooltip label="Ansprechpartner bearbeiten" placement="top">
                      <IconButton
                        onClick={() => {
                          setSelectedLettercontact(lettercontact);
                          editLettercontactOnOpen();
                        }}
                        variant={"ghost"}
                        aria-label="Ansprechpartner zeigen"
                        icon={<HiOutlineFolderOpen />}
                      />
                    </Tooltip>
                    <Tooltip label="Ansprechpartner löschen" placement="top">
                      <IconButton
                        variant={"ghost"}
                        aria-label="Ansprechpartner löschen"
                        icon={<HiOutlineTrash />}
                        colorScheme="red"
                        onClick={() => {
                          deleteLettercontact(lettercontact.id);
                        }}
                      />
                    </Tooltip>
                  </HStack>
                </HStack>
              );
            })
          ) : (
            <Alert status="warning">
              <AlertIcon />
              <AlertDescription>
                Keine Ansprechpartner vorhanden
              </AlertDescription>
            </Alert>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
}

export default LetterContactTable;
