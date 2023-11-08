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
  GridItem,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import {
  HiOutlineCheckCircle,
  HiOutlineDocumentText,
  HiOutlineDocumentMagnifyingGlass,
  HiOutlineCloudArrowDown,
  HiMiniArrowSmallRight,
  HiOutlinePrinter,
} from "react-icons/hi2";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import BotschafterModal from "./botschafterStatusModal";
import Link from "next/link";

function BotschafterDetail({ botschafter }) {
  const {
    isOpen: botschafterIsOpen,
    onOpen: botschafterOnOpen,
    onClose: botschafterOnClose,
  } = useDisclosure();

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
            Adresse
          </Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Stat>
              <StatLabel>Firma</StatLabel>
              <StatNumber>{botschafter.firma}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Name</StatLabel>
              <StatNumber>
                {`${botschafter.anrede} ${botschafter.vorname} ${botschafter.name}`}
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Straße</StatLabel>
              <StatNumber>{botschafter.strasse}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Adresse</StatLabel>
              <StatNumber>
                {botschafter.plz} {botschafter.ort}
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Bundesland</StatLabel>
              <StatNumber>{botschafter.bundesland}</StatNumber>
            </Stat>
            {/* <Stat>
              <StatLabel>Verifiziert</StatLabel>
              <StatNumber>
                <Icon as={HiOutlineCheckCircle} color={"green.500"} />
              </StatNumber>
            </Stat> */}
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
            Kontakt
          </Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Stat>
              <StatLabel>Email</StatLabel>
              <StatNumber>{botschafter.email}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Telefon</StatLabel>
              <StatNumber>{botschafter.telefon}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Mobil</StatLabel>
              <StatNumber>{botschafter.mobil}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Region</StatLabel>
              <StatNumber fontSize={15}>{botschafter.region}</StatNumber>
            </Stat>
          </Stack>
        </CardBody>
      </Card>
      <GridItem colSpan={2}>
        <Card>
          <CardHeader>
            <Heading
              size="sm"
              color="gray.500"
              fontWeight={"600"}
              textTransform={"uppercase"}
            >
              Verknüpfte Projekte
            </Heading>
          </CardHeader>
          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              {botschafter.letters.length > 0 ? (
                botschafter.letters.map((letter) => {
                  return (
                    <HStack>
                      <Stat>
                        <StatLabel>
                          {letter.plzTraeger} {letter.ortTraeger}
                        </StatLabel>
                        <StatNumber>
                          {letter.id} | {letter.nameTraeger}
                        </StatNumber>
                      </Stat>
                      <Button
                        as={Link}
                        href={`/admin/bewerbung/${letter.id}`}
                        size={"sm"}
                        variant={"outline"}
                        leftIcon={<HiOutlineDocumentText />}
                      >
                        Details
                      </Button>
                    </HStack>
                  );
                })
              ) : (
                <Alert status="warning">
                  <AlertIcon />
                  <AlertDescription>
                    Keine verknüpften Projekte vorhanden
                  </AlertDescription>
                </Alert>
              )}
            </Stack>
          </CardBody>
          {/* <CardFooter>
            <Button
              size={"sm"}
              variant={"outline"}
              leftIcon={<HiOutlinePrinter />}
            >
              PDF Export
            </Button>
          </CardFooter> */}
        </Card>
      </GridItem>
      {/* <Card>
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
              <StatLabel>Profil.pdf</StatLabel>
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
      </Card> */}
    </SimpleGrid>
  );
}

export default BotschafterDetail;
