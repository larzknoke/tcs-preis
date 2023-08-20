import {
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
            <StatNumber>{currencyFormatter(letter.privateSpenden)}</StatNumber>
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
  );
}

export default FinanzierungDetail;
