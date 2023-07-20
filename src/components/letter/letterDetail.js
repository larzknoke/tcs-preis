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
} from "@chakra-ui/react";
import {
  HiOutlineCheckCircle,
  HiOutlineCloudArrowDown,
  HiOutlineClipboard,
  HiCheck,
} from "react-icons/hi2";
import BotschafterModal from "../botschafter/botschafterModal";
import Link from "next/link";
import { Checker, currencyFormatter } from "@/lib/utils";

function LetterDetail({ letter }) {
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
            <HStack justify={"space-between"}>
              <Link href={"/botschafter/1"}>
                <Stat>
                  <StatLabel>Botschafter</StatLabel>
                  <StatNumber color={"gray.700"}>Max Mustermann</StatNumber>
                  <StatHelpText color={"gray.700"}>
                    37603 Holzminden, Niedersachsen
                  </StatHelpText>
                </Stat>
              </Link>
              <Button
                size={"sm"}
                variant={"outline"}
                onClick={botschafterOnOpen}
              >
                Botschafter bearbeiten
              </Button>
              <BotschafterModal
                botschafterOnOpen={botschafterOnOpen}
                botschafterOnClose={botschafterOnClose}
                botschafterIsOpen={botschafterIsOpen}
              />
            </HStack>
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
          <Heading
            size="sm"
            color="gray.500"
            fontWeight={"600"}
            textTransform={"uppercase"}
          >
            Dateien
          </Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Stat>
              <StatLabel>Freistellungsbescheid</StatLabel>
              <StatNumber>
                <Button
                  size={"sm"}
                  leftIcon={<HiOutlineCloudArrowDown />}
                  colorScheme="gray"
                  variant="outline"
                  mt={2}
                >
                  Download
                </Button>{" "}
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>ProjektNoah.pdf</StatLabel>
              <StatNumber>
                <Button
                  size={"sm"}
                  leftIcon={<HiOutlineCloudArrowDown />}
                  colorScheme="gray"
                  variant="outline"
                  mt={2}
                >
                  Download
                </Button>
              </StatNumber>
            </Stat>
          </Stack>{" "}
        </CardBody>
        <CardFooter></CardFooter>
      </Card>
    </SimpleGrid>
  );
}

export default LetterDetail;