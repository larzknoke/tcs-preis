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
} from "@chakra-ui/react";
import { currencyFormatter } from "@/lib/utils";

function FinanzierungDetail({ letter }) {
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
      </Card>
      <Card>
        <CardHeader>
          <Heading
            size="sm"
            color="gray.500"
            fontWeight={"600"}
            textTransform={"uppercase"}
          >
            Bank
          </Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Stat>
              <StatLabel>IBAN</StatLabel>
              <StatNumber>{letter.ibanProjekt}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Konto Name</StatLabel>
              <StatNumber>{letter.kontoNameProjekt}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Bank</StatLabel>
              <StatNumber>{letter.bankNameProjekt}</StatNumber>
            </Stat>
          </Stack>
        </CardBody>
      </Card>
    </SimpleGrid>
  );
}

export default FinanzierungDetail;
