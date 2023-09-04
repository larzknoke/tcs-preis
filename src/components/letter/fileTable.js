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
  Heading,
} from "@chakra-ui/react";
import { HiOutlineFolderOpen, HiOutlineTrash } from "react-icons/hi2";
import { dateFormatter } from "@/lib/utils";
import { useRouter } from "next/router";

function FileTable({ letter }) {
  const toast = useToast();
  const router = useRouter();

  const groupedFiles = letter.files.reduce((group, file) => {
    const { typ } = file;
    group[typ] = group[typ] ?? [];
    group[typ].push(file);
    return group;
  }, {});

  const files = Object.entries(groupedFiles);

  files.forEach((file) => {
    console.log(file[0]);
    console.log(file[1]);
  });

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
        duration: 4000,
        isClosable: true,
      });
    } else {
      // const resData = await res.json();
      toast({
        title: `Datei gelöscht.`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      router.replace(router.asPath);
    }
  }

  return (
    <div>
      {files.map((file) => {
        return (
          <Stack mb={10} spacing={0} key={file[1][0].id}>
            <Heading
              size={"sm"}
              color={"gray.300"}
              textTransform={"uppercase"}
              mb={4}
            >
              {file[0]}
            </Heading>
            <Stack divider={<StackDivider />} spacing="4">
              {file[1].length > 0 ? (
                file[1].map((file) => {
                  return (
                    <HStack key={file.id} justify={"space-between"}>
                      <Stat>
                        <StatNumber> {file.file.split("/")[1]}</StatNumber>
                        <StatLabel>{dateFormatter(file.createdAt)}</StatLabel>
                        {file.typ == "admin-upload" && (
                          <StatLabel>
                            Name: {file.title} | Notiz: {file.note}
                          </StatLabel>
                        )}
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
          </Stack>
        );
      })}
    </div>
  );
}

export default FileTable;
