import {
  SimpleGrid,
  useToast,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  HStack,
  Alert,
  AlertIcon,
  AlertDescription,
  Button,
  CardFooter,
  useDisclosure,
  Flex,
  IconButton,
  Tooltip,
  Stat,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import {
  HiOutlineFolderOpen,
  HiOutlinePlus,
  HiOutlineTrash,
} from "react-icons/hi2";

import ShowNoteModal from "./showNoteModal";
import NewNoteModal from "./newNoteModal";
import { dateFormatter } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/router";

function NoteTable({ letter }) {
  const router = useRouter();
  const toast = useToast();
  const [selectedNote, setSelectedNote] = useState({});
  const {
    isOpen: noteIsOpen,
    onOpen: noteOnOpen,
    onClose: noteOnClose,
  } = useDisclosure();
  const {
    isOpen: showNoteIsOpen,
    onOpen: showNoteOnOpen,
    onClose: showNoteOnClose,
  } = useDisclosure();

  async function deleteNote(id) {
    const resData = await fetch("/api/note?id=" + id, { method: "DELETE" });
    if (resData.status != 200) {
      toast({
        title: "Ein Fehler ist aufgetreten",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      // const resData = await res.json();
      toast({
        title: `Notiz gelöscht.`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      router.replace(router.asPath);
    }
  }

  return (
    <SimpleGrid
      spacing={6}
      columns={{ sm: 1, md: 2 }}
      // minChildWidth={"500px"}
      //   templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
    >
      <Card>
        <CardHeader>
          <Flex justify={"space-between"}>
            <Heading
              size="sm"
              color="gray.500"
              fontWeight={"600"}
              textTransform={"uppercase"}
            >
              Notizen
            </Heading>
            <Tooltip label="Neue Notiz" placement="top">
              <IconButton
                size={"sm"}
                variant="outline"
                colorScheme="green"
                aria-label="See menu"
                icon={<HiOutlinePlus />}
                onClick={() => noteOnOpen()}
              />
            </Tooltip>
            <NewNoteModal
              letter={letter}
              isOpen={noteIsOpen}
              onClose={noteOnClose}
            />
          </Flex>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            {letter.notes.length > 0
              ? letter.notes.map((note) => {
                  return (
                    <HStack key={note.id} justify={"space-between"}>
                      <Stat>
                        <StatLabel>{dateFormatter(note.createdAt)}</StatLabel>
                        <StatNumber>{note.title}</StatNumber>
                      </Stat>
                      <Tooltip label="Notiz löschen" placement="top">
                        <IconButton
                          variant={"ghost"}
                          aria-label="Notiz löschen"
                          icon={<HiOutlineTrash />}
                          onClick={() => deleteNote(note.id)}
                          colorScheme="red"
                        />
                      </Tooltip>
                      <Tooltip label="Notiz öffnen" placement="top">
                        <IconButton
                          variant={"ghost"}
                          aria-label="Notiz öffnen"
                          icon={<HiOutlineFolderOpen />}
                          onClick={() => {
                            setSelectedNote(note);
                            showNoteOnOpen();
                          }}
                        />
                      </Tooltip>
                      <ShowNoteModal
                        note={selectedNote}
                        isOpen={showNoteIsOpen}
                        onClose={showNoteOnClose}
                      />
                    </HStack>
                  );
                })
              : "no notes"}
          </Stack>
        </CardBody>
      </Card>
    </SimpleGrid>
  );
}

export default NoteTable;
