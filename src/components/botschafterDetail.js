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
} from "@chakra-ui/react";
import {
  HiOutlineCheckCircle,
  HiOutlineDocumentText,
  HiOutlineDocumentMagnifyingGlass,
  HiOutlineCloudArrowDown,
  HiMiniArrowSmallRight,
} from "react-icons/hi2";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import BotschafterModal from "./botschafterModal";

function BotschafterDetail() {
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
              <StatLabel>Name</StatLabel>
              <StatNumber>Anja Tollhausen </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Straße</StatLabel>
              <StatNumber>Lindenalee 19</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Adresse</StatLabel>
              <StatNumber>99102 Erfurt</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Bundesland</StatLabel>
              <StatNumber>Niedersachsen </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Verifiziert</StatLabel>
              <StatNumber>
                <Icon as={HiOutlineCheckCircle} color={"green.500"} />
              </StatNumber>
            </Stat>
          </Stack>
        </CardBody>
        <CardFooter>
          {/* <Button size={"sm"}>weitere Details</Button> */}
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
            Kontakt
          </Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Stat>
              <StatLabel>Email</StatLabel>
              <StatNumber>yvonne.bauer@stiftugn.de</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Ansprechpartner</StatLabel>
              <StatNumber>Yvonne Bauer </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Telefon</StatLabel>
              <StatNumber>05531 / 9320-18</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Mobil</StatLabel>
              <StatNumber>0152 / 123 456 789</StatNumber>
            </Stat>
          </Stack>
        </CardBody>
        <CardFooter>
          {/* <Button size={"sm"}>weitere Details</Button> */}
        </CardFooter>
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
              <HStack>
                <Stat>
                  <StatLabel> 37603 Holzminden</StatLabel>
                  <StatNumber>
                    Ev.-luth. Kindertagesstätte 'Arche Noah'{" "}
                  </StatNumber>
                </Stat>
                <Button
                  size={"sm"}
                  variant={"outline"}
                  leftIcon={<HiOutlineDocumentText />}
                >
                  Details
                </Button>
              </HStack>
              <HStack>
                <Stat>
                  <StatLabel>99102 Erfurt</StatLabel>
                  <StatNumber>BürgerStiftung Erfurt </StatNumber>
                </Stat>
                <Button
                  size={"sm"}
                  variant={"outline"}
                  leftIcon={<HiOutlineDocumentText />}
                >
                  Details
                </Button>
              </HStack>
              <HStack>
                <Stat>
                  <StatLabel>80687 München</StatLabel>
                  <StatNumber>Kinderschutzbund Schweinfurt </StatNumber>
                </Stat>
                <Button
                  size={"sm"}
                  variant={"outline"}
                  leftIcon={<HiOutlineDocumentText />}
                >
                  Details
                </Button>
              </HStack>
            </Stack>
          </CardBody>
          <CardFooter>
            {/* <Button size={"sm"}>weitere Details</Button> */}
          </CardFooter>
        </Card>
      </GridItem>
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
      </Card>
    </SimpleGrid>
  );
}

export default BotschafterDetail;
