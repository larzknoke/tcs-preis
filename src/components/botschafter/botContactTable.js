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
import Link from "next/link";
import NewBotcontactModal from "../botcontact/newBotcontactModal";
import EditBotcontactModal from "../botcontact/editBotcontactModal";
import { useRouter } from "next/router";
import { useState } from "react";

function BotContactTable({ botschafter }) {
  const [selectedBotcontact, setSelectedBotcontact] = useState({});

  const {
    isOpen: botcontactIsOpen,
    onOpen: botcontactOnOpen,
    onClose: botcontactOnClose,
  } = useDisclosure();
  const {
    isOpen: editBotcontactIsOpen,
    onOpen: editBotcontactOnOpen,
    onClose: editBotcontactOnClose,
  } = useDisclosure();
  const toast = useToast();
  const router = useRouter();

  async function deleteBotcontact(id) {
    const resData = await fetch("/api/botcontact?id=" + id, {
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
            Botschafter Ansprechpartner
          </Heading>
          <Button
            onClick={botcontactOnOpen}
            leftIcon={<HiUserPlus />}
            colorScheme="green"
            variant="ghost"
          >
            Neuer Ansprechpartner
          </Button>
          <NewBotcontactModal
            botschafter={botschafter}
            onClose={botcontactOnClose}
            isOpen={botcontactIsOpen}
          />
          <EditBotcontactModal
            botcontact={selectedBotcontact}
            isOpen={editBotcontactIsOpen}
            onClose={editBotcontactOnClose}
          />
        </HStack>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          {botschafter.botcontacts.length > 0 ? (
            botschafter.botcontacts.map((botcontact) => {
              return (
                <HStack justify={"space-between"} gap={6} key={botcontact.id}>
                  <VStack alignItems={"self-start"}>
                    <HStack as={"b"} fontSize={"lg"} gap={4}>
                      <Text color={"gray.500"}>{botcontact.id}</Text>
                      <Text>
                        {botcontact.anrede} {botcontact.name}
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
                          <Text>{botcontact.telefon}</Text>
                        </HStack>
                        <HStack>
                          <Icon as={HiOutlineEnvelope} color={"gray.500"} />
                          <Text>{botcontact.email}</Text>
                        </HStack>
                        <HStack>
                          <Icon as={HiOutlineUserCircle} color={"gray.500"} />
                          <Text>{botcontact.funktion}</Text>
                        </HStack>
                      </HStack>
                      {botcontact.notiz.length > 0 && (
                        <HStack alignItems={"self-start"}>
                          <Icon
                            as={HiOutlineClipboardDocumentList}
                            mt={1}
                            color={"gray.500"}
                          />
                          <Text as={"span"}>{botcontact.notiz}</Text>
                        </HStack>
                      )}
                    </VStack>
                  </VStack>
                  <HStack>
                    <Tooltip label="Ansprechpartner bearbeiten" placement="top">
                      <IconButton
                        onClick={() => {
                          setSelectedBotcontact(botcontact);
                          editBotcontactOnOpen();
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
                          deleteBotcontact(botcontact.id);
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

export default BotContactTable;
