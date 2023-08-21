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
import { Checker } from "@/lib/utils";
import BotschafterDetail from "./botschafter";

function TraegerDetail({ letter }) {
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
              <StatLabel>Name Vorstand/Geschäftsführer</StatLabel>
              <StatNumber>{letter.vorstandTraeger} </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Straße</StatLabel>
              <StatNumber>{letter.strasseTraeger} </StatNumber>
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
      </Card>
      <BotschafterDetail letter={letter} />
    </SimpleGrid>
  );
}

export default TraegerDetail;
