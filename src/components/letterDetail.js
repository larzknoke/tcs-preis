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
} from "@chakra-ui/react";
import {
  HiOutlineCheckCircle,
  HiOutlineDocumentText,
  HiOutlineDocumentMagnifyingGlass,
} from "react-icons/hi2";

function LetterDetail() {
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
            color="gray.400"
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
              <StatNumber>Anja Tollhausen </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Bundesland</StatLabel>
              <StatNumber>Niedersachsen </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Adresse</StatLabel>
              <StatNumber>99102 Erfurt</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Als gemeinnützig anerkannt</StatLabel>
              <StatNumber>
                <Icon as={HiOutlineCheckCircle} color={"green.500"} />
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
            color="gray.400"
            fontWeight={"600"}
            textTransform={"uppercase"}
          >
            Projekt
          </Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Stat>
              <StatLabel>Name</StatLabel>
              <StatNumber>Ev.-luth. Kindertagesstätte 'Arche Noah' </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Projekt</StatLabel>
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
            color="gray.400"
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
              <StatNumber>500,- € </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>
                Öffentliche Zuwendungen (z.B. Landes- oder Bundesmittel)
              </StatLabel>
              <StatNumber>250,- € </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>
                Private Spenden (z.B. Privatpersonen, Unternehmen)
              </StatLabel>
              <StatNumber>60,- € </StatNumber>
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
            color="gray.400"
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
                <Icon as={HiOutlineDocumentText} boxSize={8} color="gray.600" />
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>ProjektNoah.pdf</StatLabel>
              <StatNumber>
                <Icon as={HiOutlineDocumentText} boxSize={8} color="gray.600" />
              </StatNumber>
            </Stat>
          </Stack>{" "}
        </CardBody>
        <CardFooter>
          <Button size={"sm"}>weitere Details</Button>
        </CardFooter>
      </Card>
    </SimpleGrid>
  );
}

export default LetterDetail;
