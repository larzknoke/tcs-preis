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
            Ab dem 01. September könnt Ihr Euch mit Eurem Projekt auf den 12.
            Town &amp; Country Stiftungspreis oder den dazugehörigen Sonderpreis
            zum Motto „Jung trifft Alt - Begegnung, die verbindet“ hier
            bewerben.
          </Heading>
          <Text as={"b"} color={"gray.500"} mt={"6"} textAlign={"center"}>
            Weitere Informationen findet Ihr auf unserer Website{" "}
            <a href="https://www.tc-stiftung.de">www.tc-stiftung.de</a>{" "}
          </Text>
          <Text color={"gray.500"} mt={"4"} textAlign={"center"}>
            Gerne steht Euch das Team der Town &amp; Country Stiftung für
            weitere Fragen <br /> unter der Rufnummer 0361 / 644 789 14 oder per
            Mail{" "}
            <a href="mailto:stiftungspreis@tc-stiftung.de">
              stiftungspreis@tc-stiftung.de
            </a>{" "}
            zur Verfügung.
          </Text>
          <Text as={"b"} color={"gray.500"} mt={"8"} textAlign={"center"}>
            Wir freuen uns auf Eure Bewerbung! <br />
          </Text>
        </VStack>
      </CardBody>{" "}
    </Card>
  );
}

export default CloseText;
