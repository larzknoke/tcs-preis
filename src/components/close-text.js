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
            lineHeight={8}
          >
            Die Bewerbungsphase ist beendet - <br />
            eine Bewerbung für den 11. Town & Country Stiftungspreis nicht mehr
            möglich.
          </Heading>
          <Text color={"gray.500"} mt={"6"} as={"b"} textAlign={"center"}>
            Vielen Dank für die zahlreichen Bewerbungen, die uns erreicht haben!
          </Text>
          <Text color={"gray.500"} mt={"6"} textAlign={"center"}>
            Die Preisträger:innen werden Anfang Februar 2024 auf der Webseite
            der Stiftung{" "}
            <a href="https://www.tc-stiftung.de">www.tc-stiftung.de</a>{" "}
            öffentlich bekannt gegeben und von ihren Botschafter:innen der
            Stiftung informiert.
          </Text>
          <Text color={"gray.500"} mt={"4"} textAlign={"center"}>
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
