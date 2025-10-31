import React from "react";
import {
  OrderedList,
  ListItem,
  VStack,
  Text,
  Card,
  CardBody,
  Heading,
} from "@chakra-ui/react";

function CloseText() {
  return (
    <Card p={{ base: 2, md: 8 }}>
      <CardBody>
        <VStack>
          <Heading
            color={"brand.900"}
            size={"md"}
            textAlign={"center"}
            mb={3}
            lineHeight={8}
            px={{ base: 2, md: 4 }}
          >
            Die Bewerbungsphase für den 12. Town & Country Stiftungspreis ist
            beendet.
          </Heading>
          <Text color={"gray.500"} mt={"4"} textAlign={"center"}>
            Vielen Dank für die zahlreichen Bewerbungen und Euer Interesse am
            12. Town & Country Stiftungspreis! <br /> Wir freuen uns über die
            bundesweit agierenden sowie wirkungsvollen Projekte für Kinder- und
            Jugendhilfe.
          </Text>
          <Text color={"gray.500"} mt={"4"} textAlign={"center"}>
            Die Preisträger:innen werden Ende Januar 2026 auf der Webseite der
            Stiftung bekannt gegeben.
          </Text>
          <Text color={"gray.500"} mt={"4"} textAlign={"center"}>
            Alle diejenigen, die in diesem Jahr nicht berücksichtigt werden
            konnten, bitten wir um Verständnis. <br />
            Es gibt unzählige wertvolle Projekte und wir müssen eine Auswahl
            treffen!
          </Text>
          <Text color={"gray.500"} mt={"4"} textAlign={"center"}>
            Wir, das Team der Town & Country Stiftung, beantworten gern Eure
            Fragen: <br /> Telefon 0361/ 644 789 14 oder per E-Mail:{" "}
            <a href="mailto:stiftungspreis@tc-stiftung.de">
              stiftungspreis@tc-stiftung.de
            </a>{" "}
          </Text>
          <Text as={"b"} color={"gray.500"} mt={"8"} textAlign={"center"}>
            Eure Town & Country Stiftung
          </Text>
        </VStack>
      </CardBody>{" "}
    </Card>
  );
}

export default CloseText;
