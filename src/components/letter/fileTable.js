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
  useDisclosure,
} from "@chakra-ui/react";
import { HiOutlineFolderOpen, HiOutlineTrash } from "react-icons/hi2";
import { dateFormatter } from "@/lib/utils";
import { useRouter } from "next/router";
import FileDeleteModal from "../file/fileDeleteModal";
import { useState } from "react";

function FileTable({ letter, uploadType = "" }) {
  const toast = useToast();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const groupedFiles = letter.files
    .filter((file) => (uploadType.length > 0 ? file.typ == uploadType : true))
    .reduce((group, file) => {
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
    setLoading(true);
    const resData = await fetch("/api/file?id=" + id, { method: "DELETE" });
    if (resData.status != 200) {
      toast({
        title: "Ein Fehler ist aufgetreten",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      setLoading(false);
    } else {
      toast({
        title: `Datei gelöscht.`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      setLoading(false);
      onCloseDelete();
      router.replace(router.asPath);
    }
  }

  return (
    <div>
      {files.map((file) => {
        return (
          <Stack
            mb={7}
            spacing={0}
            key={file[1][0].id}
            borderBottomWidth={"1px"}
            borderBottomColor={"gray"}
            pb={5}
          >
            <Heading
              size={"sm"}
              color={"gray.500"}
              textTransform={"uppercase"}
              mb={4}
              textAlign={"right"}
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
                          // onClick={() => deleteFile(file.id)}
                          onClick={() => onOpenDelete()}
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
                      <FileDeleteModal
                        file={file}
                        onOpen={onOpenDelete}
                        onClose={onCloseDelete}
                        isOpen={isOpenDelete}
                        deleteFile={deleteFile}
                        loading={loading}
                      />
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
