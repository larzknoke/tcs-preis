import {
  Card,
  CardBody,
  CardHeader,
  Stack,
  Box,
  Heading,
  StackDivider,
  Text,
  HStack,
  useDisclosure,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import Link from "next/link";

function KampagnenBundesland({ groupLetters, abgelehntAnzeigen }) {
  return (
    <Card>
      <CardHeader>
        <HStack justifyContent={"space-between"}>
          <Heading size="md">Bewerbungen nach Bundesland</Heading>
        </HStack>
      </CardHeader>
      <CardBody>
        <Accordion allowMultiple>
          {Object.entries(groupLetters)
            .sort()
            .map(([bundesland, letters]) => {
              return (
                <AccordionItem key={bundesland}>
                  <h2>
                    <AccordionButton>
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        color={"brand.900"}
                        fontWeight={"bold"}
                      >
                        {`${bundesland} (${
                          letters.filter((letter) =>
                            abgelehntAnzeigen
                              ? true
                              : [
                                  "1111",
                                  "5000",
                                  "ausland1111",
                                  "ausland5000",
                                ].includes(letter.status)
                          ).length
                        })`}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    {letters
                      .filter((letter) =>
                        abgelehntAnzeigen ? true : letter.status != "abgelehnt"
                      )
                      .map((letter) => {
                        return (
                          <Link
                            href={`/admin/bewerbung/${letter.id}`}
                            target="_black"
                            rel="noopener noreferrer"
                            key={letter.id}
                          >
                            <Text
                              pt="2"
                              fontSize="sm"
                              color={
                                letter.botschafterConfirm
                                  ? "brand.900"
                                  : "red.300"
                              }
                              _hover={{
                                textDecoration: "underline",
                                color: "gray.900",
                              }}
                            >
                              {`${letter.id} | ${letter.status} | Träger: ${
                                letter.bundeslandTraeger
                              }${
                                letter.botschafter
                                  ? `| Bot: ${letter.botschafter.vorname} ${letter.botschafter.name}`
                                  : ""
                              } | Projekt: ${
                                letter.bundeslandProjekt || "-"
                              } | ${
                                letter.nameProjekt.length > 80
                                  ? letter.nameProjekt.substring(0, 80) + "..."
                                  : letter.nameProjekt
                              } | ${letter.nameTraeger}  `}
                            </Text>
                          </Link>
                        );
                      })}
                  </AccordionPanel>
                </AccordionItem>
              );
            })}
        </Accordion>
      </CardBody>
    </Card>
  );
}

export default KampagnenBundesland;
