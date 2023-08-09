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
          <OrderedList spacing={6} color={"gray.500"}>
            <ListItem>
              Das Bewerbungsverfahren beginnt am 02. Oktober 2023 und endet am
              30. November 2023 um 24:00 Uhr.
            </ListItem>
            <ListItem>
              Es ist lediglich eine Bewerbung pro gemeinnützige
              Organisation/Einrichtung zulässig. Sofern mehrere Bewerbungen von
              ein- und derselben (bspw. unter einem Dachverband tätigen)
              Organisation/Vereinigung eingereicht werden, wird die zeitlich
              zuerst eingegangene Bewerbung gewertet. Vereine/Organisationen,
              die in den letzten drei aufeinanderfolgenden Jahren (2020, 2021,
              2022) von der Stiftung jeweils eine Zuwendung erhalten haben,
              werden von einer Förderung in 2023 ausgeschlossen.
            </ListItem>
            <ListItem>
              Bitte verwenden Sie einen aktuellen Browser, anderenfalls besteht
              die Möglichkeit, dass Ihre Bewerbung nicht zugestellt werden kann.
            </ListItem>
            <ListItem>
              Das Zwischenspeichern Ihrer Angaben ist lediglich bei Benutzung
              desselben Geräts und Browsers möglich.
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
              Aus allen eingehenden Bewerbungen werden 333 Bewerbungen, die die
              Bewerbungskriterien erfüllen, ausgewählt und erhalten eine
              Förderung in Höhe von EUR 1.111. Die Auswahlentscheidung trifft
              die Stiftung.
            </ListItem>
          </OrderedList>
          <Text color={"gray.500"} mt={"8"}>
            Gern steht Ihnen das Team der Town & Country Stiftung für weitere
            Fragen unter der Rufnummer 0361 / 644 789 14 oder per E-Mail:{" "}
            <a href="mailto:stiftungspreis@tc-stiftung.de">
              stiftungspreis@tc-stiftung.de
            </a>{" "}
            zur Verfügung.
          </Text>
          <Text color={"gray.500"} as={"b"} mt={"8"}>
            Wir freuen uns auf Ihre Bewerbung und wünschen Ihnen viel Erfolg!
          </Text>
          <Text as={"b"} color={"gray.500"}>
            Ihre Town &amp; Country Stiftung
          </Text>
        </VStack>
      </CardBody>{" "}
    </Card>
  );
}

export default TeaserText;
