import {
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Stat,
  StatLabel,
  StatNumber,
  HStack,
  Tooltip,
  IconButton,
  useClipboard,
  useDisclosure,
} from "@chakra-ui/react";
import {
  HiOutlineClipboard,
  HiCheck,
  HiOutlinePencilSquare,
} from "react-icons/hi2";
import { useEffect } from "react";
import ProjektEditModal from "./projektEditModal";

function ProjektDetail({ letter }) {
  const { onCopy, setValue, hasCopied } = useClipboard();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
              Projekt
            </Heading>
            <Tooltip label="Bearbeiten">
              <IconButton
                onClick={onOpen}
                variant="ghost"
                colorScheme="gray"
                aria-label="See menu"
                color="gray.600"
                icon={<HiOutlinePencilSquare size={20} />}
              />
            </Tooltip>
            <ProjektEditModal
              onClose={onClose}
              isOpen={isOpen}
              letter={letter}
            />
          </HStack>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Stat>
              <StatLabel>Name der Organisation/Einrichtung</StatLabel>
              <StatNumber>{letter.organisationProjekt} </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Name des Projekts</StatLabel>
              <StatNumber>{letter.nameProjekt} </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Ansprechpartner</StatLabel>
              <StatNumber>{letter.ansprechpartnerProjekt}</StatNumber>
            </Stat>
            <HStack justify={"space-between"}>
              <Stat>
                <StatLabel>Email</StatLabel>
                <StatNumber>{letter.emailProjekt}</StatNumber>
              </Stat>
              <Tooltip label="In Zwischenablage kopieren" placement={"top"}>
                <IconButton
                  size={"sm"}
                  onClick={onCopy}
                  icon={hasCopied ? <HiCheck /> : <HiOutlineClipboard />}
                  variant={"outline"}
                  colorScheme={hasCopied ? "green" : "gray"}
                />
              </Tooltip>
            </HStack>
            <Stat>
              <StatLabel>Website, Facebook, Instagram</StatLabel>
              <StatNumber>{letter.wwwProjekt}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Telefon</StatLabel>
              <StatNumber>{letter.telefonnummerProjekt}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Mobil</StatLabel>
              <StatNumber>{letter.mobilProjekt}</StatNumber>
            </Stat>
          </Stack>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <Heading
            size="sm"
            color="gray.500"
            fontWeight={"600"}
            textTransform={"uppercase"}
          >
            Adresse (abweichend vom Träger)
          </Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Stat>
              <StatLabel>Strasse</StatLabel>
              <StatNumber>{letter.strasseProjekt || "-"}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>PLZ</StatLabel>
              <StatNumber>{letter.plzProjekt || "-"}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Ort</StatLabel>
              <StatNumber>{letter.ortProjekt || "-"}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Bundesland</StatLabel>
              <StatNumber>{letter.bundeslandProjekt || "-"}</StatNumber>
            </Stat>
          </Stack>
        </CardBody>
      </Card>
    </SimpleGrid>
  );
}

export default ProjektDetail;
