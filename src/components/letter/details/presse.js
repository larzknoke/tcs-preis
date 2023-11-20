import {
  Text,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  StackDivider,
  Stat,
  StatLabel,
  StatNumber,
  Button,
  HStack,
  StatHelpText,
  useDisclosure,
  Tooltip,
  IconButton,
  useClipboard,
  Flex,
} from "@chakra-ui/react";
import { HiOutlinePencilSquare, HiOutlinePlus } from "react-icons/hi2";
import { useEffect } from "react";
import { Checker, dateFormatter } from "@/lib/utils";
import PresseEditModal from "./presseEditModal";
import NewFileModal from "../newFileModal";
import FileTable from "../fileTable";

function PresseDetail({ letter }) {
  const {
    isOpen: fileIsOpen,
    onOpen: fileOnOpen,
    onClose: fileOnClose,
  } = useDisclosure();
  const {
    isOpen: presseIsOpen,
    onOpen: presseOnOpen,
    onClose: presseOnClose,
  } = useDisclosure();
  const { onCopy, setValue, hasCopied } = useClipboard();

  useEffect(() => {
    setValue(letter.emailProjekt);
  }, []);
  return (
    <SimpleGrid
      spacing={6}
      columns={{ sm: 1, md: 2 }}
      // minChildWidth={"500px"}
      //   templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
    >
      <Card>
        <CardHeader>
          <HStack justifyContent={"space-between"}>
            <Heading
              size="sm"
              color="gray.500"
              fontWeight={"600"}
              textTransform={"uppercase"}
            >
              Presse
            </Heading>
            <Tooltip label="Bearbeiten">
              <IconButton
                onClick={presseOnOpen}
                variant="ghost"
                colorScheme="gray"
                aria-label="See menu"
                color="gray.600"
                icon={<HiOutlinePencilSquare size={20} />}
              />
            </Tooltip>
            <PresseEditModal
              onClose={presseOnClose}
              isOpen={presseIsOpen}
              letter={letter}
            />
          </HStack>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Stat>
              <StatLabel>Pressearbeit erwünscht</StatLabel>
              <StatNumber>
                <Checker bool={letter.presseErlaubt} />
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Pressetext</StatLabel>
              <StatNumber fontSize={15}>{letter.presseText || "-"}</StatNumber>
            </Stat>
            <Flex direction={"column"} my={4} gap={2}>
              <Text as={"b"}>Presse Daten:</Text>
              <Stat>
                <StatLabel>Presseeinladung versendet</StatLabel>
                <StatNumber>
                  {dateFormatter(letter.presseEinladung, false)}
                </StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Pressemitteilung erstellt</StatLabel>
                <StatNumber>
                  {dateFormatter(letter.presseMitteilung, false)}
                </StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Pressemitteilung freigegeben</StatLabel>
                <StatNumber>
                  {dateFormatter(letter.presseFreigabe, false)}
                </StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Pressemitteilung versendet</StatLabel>
                <StatNumber>
                  {dateFormatter(letter.presseVersendet, false)}
                </StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Pressearbeit erledigt</StatLabel>
                <StatNumber>
                  {dateFormatter(letter.presseErledigt, false)}
                </StatNumber>
              </Stat>
            </Flex>
          </Stack>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <Flex justify={"space-between"}>
            <Heading
              size="sm"
              color="gray.500"
              fontWeight={"600"}
              textTransform={"uppercase"}
            >
              Presse Dateien
            </Heading>
            <Tooltip label="Neue Presse Datei" placement="top">
              <IconButton
                size={"sm"}
                variant="outline"
                colorScheme="green"
                aria-label="See menu"
                icon={<HiOutlinePlus />}
                onClick={() => fileOnOpen()}
              />
            </Tooltip>
            <NewFileModal
              letter={letter}
              isOpen={fileIsOpen}
              onClose={fileOnClose}
              uploadType={"presse-upload"}
            />
          </Flex>
        </CardHeader>
        <CardBody>
          <FileTable uploadType={"presse-upload"} letter={letter} />
        </CardBody>
      </Card>
    </SimpleGrid>
  );
}

export default PresseDetail;