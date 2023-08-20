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
import { Checker } from "@/lib/utils";

function TraegerDetail({ letter }) {
  return (
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
  );
}

export default TraegerDetail;
