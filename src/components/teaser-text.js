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

function TeaserText() {
  return (
    <Card p="8">
      <CardBody>
        <VStack>
          <Heading
            color={"brand.900"}
            size={"md"}
            textAlign={"center"}
            mb={"6"}
          >
            Hinweise zur Bewerbung
          </Heading>
          <OrderedList spacing={6}>
            <ListItem>
              Das Bewerbungsverfahren beginnt am 01. Februar 2022 und endet am
              03. April 2022 um 24:00 Uhr.
            </ListItem>
            <ListItem>
              Es ist maximal eine Bewerbung pro gemeinnütziger
              Organisation/Einrichtung zulässig. Sofern mehrere Bewerbungen ein-
              und derselben (bspw. unter einem Dachverband tätigen)
              Organisation/Vereinigung eingereicht werden, wird die zeitlich
              zuerst eingegangene Bewerbung gewertet. Vereine/Organisationen,
              die in den letzten drei aufeinanderfolgenden Jahren
              (2019,2020,2021) von der Stiftung eine Zuwendung erhalten haben,
              werden von einer Förderung ausgeschlossen.
            </ListItem>
            <ListItem>
              Bitte verwenden Sie einen aktuellen Browser, anderenfalls besteht
              die Möglichkeit, dass Ihre Bewerbung nicht zugestellt werden kann.
            </ListItem>
            <ListItem>
              Das Zwischenspeichern Ihrer Angaben ist nicht möglich; bitte
              füllen Sie die Bewerbungsmaske daher vollständig aus und senden
              Sie diese ab.
            </ListItem>
            <ListItem>
              Der gültige Freistellungsbescheid des für Sie zuständigen
              Finanzamtes ist Bestandteil Ihrer Bewerbung und daher zwingend
              beizufügen. Die hochzuladende Datei darf eine Größe von 10 MB
              nicht überschreiten.
            </ListItem>
            <ListItem>
              Fotos oder andere Dateien, die Sie als Datei hochladen, dürfen
              insgesamt eine Größe von 10 MB nicht überschreiten (die Datei des
              Freistellungsbescheides ist hier inbegriffen).
            </ListItem>
            <ListItem>
              Nach Absenden Ihrer Bewerbung und{" "}
              <Text as="b">Bestätigung des Ihnen zugesandten Links</Text>,
              erhalten Sie eine automatisierte Bestätigungs-E-Mail. Die
              Bestätigungs-E-Mail stellt noch keine Erklärung dar, dass die
              Bewerbung berücksichtigungsfähig ist, sie dient lediglich Ihrer
              Information über die technisch erfolgte Übermittlung der
              Bewerbung. Ihre Bewerbung kann nur berücksichtigt werden, wenn
              alle Unterlagen vollständig und ordnungsgemäß eingereicht werden.
              Weitere Eingangsbestätigungen erhalten Sie nicht.
            </ListItem>
            <ListItem>
              Aus allen eingehenden Bewerbungen werden 500 Bewerbungen, die die
              Bewerbungskriterien erfüllen, ausgewählt und erhalten eine
              Förderung in Höhe von EUR 1.000. Die Auswahlentscheidungen trifft
              die Stiftung.
            </ListItem>
          </OrderedList>
          <Text mt={"8"}>
            Gern steht Ihnen das Team der Town & Country Stiftung für weitere
            Fragen unter der Rufnummer 0361 / 644 789 14 oder per E-Mail:{" "}
            <a href="mailto:stiftungspreis@tc-stiftung.de">
              stiftungspreis@tc-stiftung.de
            </a>{" "}
            zur Verfügung.
          </Text>
          <Text as={"b"} mt={"8"}>
            Wir freuen uns auf Ihre Bewerbung und wünschen Ihnen viel Erfolg!
          </Text>
          <Text as={"b"}>Ihr Team der Town & Country Stiftung</Text>
        </VStack>
      </CardBody>{" "}
    </Card>
  );
}

export default TeaserText;