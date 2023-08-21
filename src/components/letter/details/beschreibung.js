import {
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
} from "@chakra-ui/react";
import Link from "next/link";
import BotschafterModal from "@/components/botschafter/botschafterStatusModal";
import { HiOutlineClipboard, HiCheck, HiOutlinePlus } from "react-icons/hi2";
import { useEffect } from "react";

function BeschreibungDetail({ letter }) {
  const {
    isOpen: botschafterIsOpen,
    onOpen: botschafterOnOpen,
    onClose: botschafterOnClose,
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
          <Heading
            size="sm"
            color="gray.500"
            fontWeight={"600"}
            textTransform={"uppercase"}
          >
            Projektdetails
          </Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Stat>
              <StatLabel>Seit wann besteht das Projekt</StatLabel>
              <StatNumber>{letter.wannProjekt} </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Mitarbeiter</StatLabel>
              <StatNumber>{letter.mitarbeiterProjekt} </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Hauptamtlich Anzahl / Stunden</StatLabel>
              <StatNumber>
                {letter.hauptamtlichAnzahl} / {letter.hauptamtlichStunden}
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Ehrenamtlich Anzahl / Stunden</StatLabel>
              <StatNumber>
                {letter.hauptamtlichAnzahl} / {letter.ehrenamtlichStunden}
              </StatNumber>
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
            Beschreibung
          </Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Stat>
              <StatLabel>Projektbeschreibung</StatLabel>
              <StatNumber fontSize={15}>
                {letter.beschreibungProjekt}
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Zielsetzung des Projektes</StatLabel>
              <StatNumber fontSize={15}>{letter.zielsetzungProjekt}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Benachteiligung</StatLabel>
              <StatNumber fontSize={15}>
                {letter.benachteiligungProjekt}
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Projektumsetzung / Projektrealisierung</StatLabel>
              <StatNumber fontSize={15}>{letter.umsetzungProjekt}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Bisherige Ergebnisse</StatLabel>
              <StatNumber fontSize={15}>
                {letter.bisherigeErgebnisse}
              </StatNumber>
            </Stat>
          </Stack>
        </CardBody>
      </Card>
    </SimpleGrid>
  );
}

export default BeschreibungDetail;
