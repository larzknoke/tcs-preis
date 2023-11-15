import {
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Button,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Stack,
  StackDivider,
  Icon,
  Tooltip,
  HStack,
  GridItem,
  Alert,
  AlertIcon,
  AlertDescription,
  VStack,
} from "@chakra-ui/react";
import {
  HiOutlineCheckCircle,
  HiOutlineDocumentText,
  HiOutlineNoSymbol,
} from "react-icons/hi2";
import Link from "next/link";

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
                    <HStack justify={"space-between"}>
                      <VStack alignItems={"self-start"}>
                        <Text as={"span"} color={"gray.400"}>
                          {letter.plzTraeger} {letter.ortTraeger}
                        </Text>
                        <HStack as={"b"} fontSize={"lg"} gap={4}>
                          <Text color={"gray.400"}>{letter.id}</Text>
                          <Text>
                            {letter.organisationProjekt} | {letter.nameProjekt}
                          </Text>
                        </HStack>
                        <HStack as={"span"} color={"gray.400"}>
                          <Text>
                            {letter.emailProjekt} |{" "}
                            {letter.telefonnummerProjekt} |{" "}
                            {letter.mobilProjekt} | {letter.wwwProjekt}
                          </Text>
                        </HStack>
                      </VStack>
                      <HStack gap={6}>
                        {letter.botschafterConfirm ? (
                          <Tooltip label={"Botschafter bestätigt"}>
                            <div>
                              <Icon
                                fontSize={"xl"}
                                as={HiOutlineCheckCircle}
                                color={"green.500"}
                              />
                            </div>
                          </Tooltip>
                        ) : (
                          <Tooltip label={"Botschafter nicht bestätigt"}>
                            <div>
                              <Icon
                                fontSize={"xl"}
                                as={HiOutlineNoSymbol}
                                color={"red.500"}
                              />
                            </div>
                          </Tooltip>
                        )}
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
        </Card>
      </GridItem>
    </SimpleGrid>
  );
}

export default BotschafterDetail;
