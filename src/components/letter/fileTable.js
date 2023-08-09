import {
  Stack,
  StackDivider,
  Stat,
  StatLabel,
  StatNumber,
  HStack,
  Tooltip,
  IconButton,
  useToast,
  Alert,
  AlertDescription,
  AlertIcon,
} from "@chakra-ui/react";
import { HiOutlineFolderOpen, HiOutlineTrash } from "react-icons/hi2";
import { dateFormatter } from "@/lib/utils";
import { useRouter } from "next/router";

function FileTable({ letter }) {
  const toast = useToast();
  const router = useRouter();

  async function getFile(file) {
    const res = await fetch("/api/file?key=" + file, { method: "GET" });
    const url = await res.json();
    window.open(url, "_blank").focus();
  }
  async function deleteFile(id) {
    const resData = await fetch("/api/file?id=" + id, { method: "DELETE" });
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
        title: `Datei gelöscht.`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      router.replace(router.asPath);
    }
  }

  return (
    <Stack divider={<StackDivider />} spacing="4">
      {letter.files.length > 0 ? (
        letter.files.map((file) => {
          return (
            <HStack key={file.id} justify={"space-between"}>
              <Stat>
                <StatLabel>
                  {dateFormatter(file.createdAt)} | {file.typ}
                </StatLabel>
                <StatNumber> {file.file.split("/")[1]}</StatNumber>
                <StatLabel>
                  Name: {file.title} | Notiz: {file.note}
                </StatLabel>
              </Stat>
              <Tooltip label="Datei löschen" placement="top">
                <IconButton
                  variant={"ghost"}
                  aria-label="Datei löschen"
                  icon={<HiOutlineTrash />}
                  onClick={() => deleteFile(file.id)}
                  colorScheme="red"
                />
              </Tooltip>
              <Tooltip label="Datei öffnen" placement="top">
                <IconButton
                  variant={"ghost"}
                  aria-label="Datei öffnen"
                  icon={<HiOutlineFolderOpen />}
                  onClick={() => getFile(file.file)}
                />
              </Tooltip>
            </HStack>
          );
        })
      ) : (
        <Alert status="warning">
          <AlertIcon />
          <AlertDescription>kein Dateien vorhanden</AlertDescription>
        </Alert>
      )}
    </Stack>
  );
}

export default FileTable;
