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
            mb={"6"}
          >
            Die Bewerbungsphase ist beendet
          </Heading>
          <Text color={"gray.500"} mt={"4"}>
            Vielen Dank für das große Interesse am 11. Town & Country
            Stiftungspreis und die zahlreichen Bewerbungen, die uns erreicht
            haben! Die Resonanz auf unsere Ausschreibung war beeindruckend.
            Gleichzeitig gingen weit mehr Bewerbungen ein, als gefördert werden
            können. Mit dem 11. Stiftungspreis fördern wir bundesweit 300
            Projekte. Daher haben wir uns dazu entschieden, das
            Bewerbungsverfahren vorzeitig zu schließen.
          </Text>
          <Text color={"gray.500"} mt={"6"} as={"b"}>
            Aufgrund der hohen Nachfrage ist eine Bewerbung für den 11. Town &
            Country Stiftungspreis nicht mehr möglich.
          </Text>
          <Text color={"gray.500"} mt={"6"}>
            Die Preisträger:innen werden Anfang Februar 2024 auf der Webseite
            der Stiftung öffentlich bekannt gegeben und von ihren
            Botschafter:innen der Stiftung informiert.
          </Text>
          <Text color={"gray.500"} mt={"4"}>
            Wir bitten alle, die in diesem Jahr nicht berücksichtigt werden
            können, um Verständnis und freuen uns auf eine Teilnahme beim 12.
            Stiftungspreis.
          </Text>
          <Text color={"gray.500"} mt={"4"}>
            Gern steht Ihnen das Team der Town & Country Stiftung für weitere
            Fragen unter der Rufnummer 0361 / 644 789 14 oder per E-Mail:{" "}
            <a href="mailto:stiftungspreis@tc-stiftung.de">
              stiftungspreis@tc-stiftung.de
            </a>{" "}
            zur Verfügung.
          </Text>
          <Text as={"b"} color={"gray.500"} mt={"8"}>
            Ihre Town &amp; Country Stiftung
          </Text>
        </VStack>
      </CardBody>{" "}
    </Card>
  );
}

export default CloseText;
