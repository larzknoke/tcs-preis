import { useEffect } from "react";
import {
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Heading,
  CardFooter,
  Button,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Stack,
  StackDivider,
  Icon,
  useDisclosure,
  Tooltip,
  HStack,
  VStack,
  IconButton,
  useClipboard,
  Alert,
  AlertIcon,
  AlertDescription,
  Flex,
} from "@chakra-ui/react";
import { HiOutlineClipboard, HiCheck, HiOutlinePlus } from "react-icons/hi2";
import BotschafterModal from "../botschafter/botschafterStatusModal";
import Link from "next/link";
import { Checker, currencyFormatter } from "@/lib/utils";
import NoteTable from "../notes/noteTable";
import FileTable from "./fileTable";
import NewFileModal from "./newFileModal";

function LetterDetail({ letter }) {
  const {
    isOpen: botschafterIsOpen,
    onOpen: botschafterOnOpen,
    onClose: botschafterOnClose,
  } = useDisclosure();
  const {
    isOpen: fileIsOpen,
    onOpen: fileOnOpen,
    onClose: fileOnClose,
  } = useDisclosure();
  const { onCopy, setValue, hasCopied } = useClipboard();

  useEffect(() => {
    setValue(letter.emailProjekt);
  }, []);

  return (
    <SimpleGrid
      spacing={6}
      columns={2}
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
            Träger
          </Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Stat>
              <StatLabel>Name</StatLabel>
              <StatNumber>{letter.nameTraeger} </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Bundesland</StatLabel>
              <StatNumber>{letter.bundeslandTraeger} </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Adresse</StatLabel>
              <StatNumber>
                {letter.plzTraeger} {letter.ortTraeger}
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Als gemeinnützig anerkannt</StatLabel>
              <StatNumber>
                <Checker bool={letter.vereinTraeger} />
              </StatNumber>
            </Stat>
          </Stack>
        </CardBody>
        <CardFooter>
          <Button size={"sm"}>weitere Details</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Heading
            size="sm"
            color="gray.500"
            fontWeight={"600"}
            textTransform={"uppercase"}
          >
            Projekt
          </Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <HStack justify={"space-between"}>
              {letter.botschafter ? (
                <Link href={`/admin/botschafter/${letter.botschafter.id}`}>
                  <Stat>
                    <StatLabel>Botschafter</StatLabel>
                    <StatNumber color={"gray.700"}>
                      {letter.botschafter.name}
                    </StatNumber>
                    <StatHelpText color={"gray.700"}>
                      {`${letter.botschafter.plz} ${letter.botschafter.ort}, ${letter.botschafter.bundesland}`}
                    </StatHelpText>
                  </Stat>
                </Link>
              ) : (
                <Alert status="warning" w={"60%"}>
                  {" "}
                  <AlertIcon />
                  <AlertDescription>
                    kein Botschafter verknüpft
                  </AlertDescription>
                </Alert>
              )}
              <Button
                size={"sm"}
                variant={"outline"}
                onClick={botschafterOnOpen}
              >
                {letter.botschafter
                  ? "Botschafter bearbeiten"
                  : "Botschafter verknüpfen"}
              </Button>
              <BotschafterModal
                botschafterOnOpen={botschafterOnOpen}
                botschafterOnClose={botschafterOnClose}
                botschafterIsOpen={botschafterIsOpen}
                botschafter={letter.botschafter}
                letter={letter}
              />
            </HStack>
            <Stat>
              <StatLabel>Name der Organisation/Einrichtung</StatLabel>
              <StatNumber>{letter.organisationProjekt} </StatNumber>
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
              <StatLabel>Telefon</StatLabel>
              <StatNumber>{letter.telefonnummerProjekt}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Mobil</StatLabel>
              <StatNumber>{letter.mobilProjekt}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>IBAN</StatLabel>
              <StatNumber>{letter.ibanProjekt}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Konto Name</StatLabel>
              <StatNumber>{letter.kontoNameProjekt}</StatNumber>
            </Stat>
          </Stack>
        </CardBody>
        <CardFooter>
          <Button size={"sm"}>weitere Details</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Heading
            size="sm"
            color="gray.500"
            fontWeight={"600"}
            textTransform={"uppercase"}
          >
            Finanzierung
          </Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Stat>
              <StatLabel>Eigenmittel</StatLabel>
              <StatNumber>{currencyFormatter(letter.eigenmittel)}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>
                Öffentliche Zuwendungen (z.B. Landes- oder Bundesmittel)
              </StatLabel>
              <StatNumber>
                {currencyFormatter(letter.oeffentlicheZuwendungen)}
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>
                Private Spenden (z.B. Privatpersonen, Unternehmen)
              </StatLabel>
              <StatNumber>
                {currencyFormatter(letter.privateSpenden)}
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>
                Bisherige Förderung Ihres Vereins/Organisation durch die TC
                Stiftung
              </StatLabel>
              <StatNumber>
                {currencyFormatter(letter.bisherigeFoerderung)}
              </StatNumber>
            </Stat>
          </Stack>
        </CardBody>
        <CardFooter>
          <Button size={"sm"}>weitere Details</Button>
        </CardFooter>
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
              Dateien
            </Heading>
            <Tooltip label="Neue Datei" placement="top">
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
            />
          </Flex>
        </CardHeader>
        <CardBody>
          <FileTable letter={letter} />
        </CardBody>
      </Card>
      <NoteTable letter={letter} />
    </SimpleGrid>
  );
}

export default LetterDetail;
