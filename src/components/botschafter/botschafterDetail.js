import {
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  Stack,
  StackDivider,
  GridItem,
} from "@chakra-ui/react";
import BotlettersTable from "./botlettersTable";
import BotContactTable from "./botContactTable";

function BotschafterDetail({ botschafter }) {
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
        <BotContactTable botschafter={botschafter} />
      </GridItem>
      <GridItem colSpan={2}>
        <BotlettersTable botschafter={botschafter} />
      </GridItem>
    </SimpleGrid>
  );
}

export default BotschafterDetail;
