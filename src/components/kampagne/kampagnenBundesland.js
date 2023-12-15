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

function KampagnenBundesland({ groupLetters }) {
  return (
    <Card>
      <CardHeader>
        <HStack justifyContent={"space-between"}>
          <Heading size="md">Bewerbungen nach Bundesland</Heading>
        </HStack>
      </CardHeader>
      <CardBody>
        <Accordion defaultIndex={[0]} allowMultiple>
          {Object.entries(groupLetters)
            .sort()
            .map(([bundesland, letters]) => {
              return (
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        color={"brand.900"}
                        fontWeight={"bold"}
                      >
                        {`${bundesland} (${letters.length})`}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    {letters.map((letter) => {
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
                            color={"gray.600"}
                            _hover={{
                              textDecoration: "underline",
                              color: "gray.900",
                            }}
                          >
                            {`${letter.id} | ${letter.status} | Träger: ${
                              letter.bundeslandTraeger
                            } | Projekt: ${letter.bundeslandProjekt || "-"} | ${
                              letter.nameProjekt
                            } | ${letter.nameTraeger} `}
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
