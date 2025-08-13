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
    <Card p={{ base: 2, md: 8 }}>
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
              Das Bewerbungsverfahren beginnt am 1. September 2025 und endet am
              31. Oktober 2025 um 24:00 Uhr.
            </ListItem>
            <ListItem>
              Es ist eine Bewerbung pro gemeinnützige Organisation/Einrichtung
              zulässig. Sofern mehrere Bewerbungen von ein und derselben (z.B.
              unter einem Dachverband tätigen) Organisation/ Vereinigung
              eingereicht werden, wird die zeitlich zuerst eingegangene
              Bewerbung berücksichtigt.
            </ListItem>
            <ListItem>
              Vereine/ Organisationen, die in den letzten drei
              aufeinanderfolgenden Jahren (2021, 2022, 2023) eine Zuwendung
              erhalten haben, sind von der Förderung in 2025 ausgeschlossen.
            </ListItem>
            <ListItem>
              Bitte verwendet einen aktuellen Browser, andernfalls besteht die
              Möglichkeit, dass Eure Bewerbung nicht übermittelt werden kann.
            </ListItem>
            <ListItem>
              Das Zwischenspeichern Eurer Angaben ist nur bei Benutzung
              desselben Geräts und Browsers möglich.
            </ListItem>
            <ListItem>
              Der gültige Freistellungsbescheid des für Euch zuständigen
              Finanzamtes ist Bestandteil Eurer Bewerbung und daher unbedingt
              der Bewerbung beizufügen. Die Datei darf eine Dateigröße von 10 MB
              nicht überschreiten.
            </ListItem>
            <ListItem>
              Fotos oder andere Dateien, die Ihr hochladet, dürfen eine
              Dateigröße von insgesamt 10 MB nicht überschreiten. (Die Datei des
              Freistellungsbescheids zählt hier dazu.)
            </ListItem>
            <ListItem>
              Nach Absenden Eurer Bewerbung und der Bestätigung des zugesandten
              Links, erhaltet Ihr eine automatische Bestätigungs-E-Mail. Diese
              Bestätigungs-E-Mail stellt keine Erklärung dar, dass Eure
              Bewerbung berücksichtigt wird; sie dient Euch als
              Eingangsbestätigung der technisch erfolgten Übermittlung Eurer
              Bewerbung.
              <Text className="mt-2">
                {" "}
                Eure Bewerbung kann nur berücksichtigt werden, wenn alle
                Unterlagen vollständig und ordnungsgemäß eingereicht wurden.
              </Text>
            </ListItem>
            <ListItem>
              Aus allen eingereichten Bewerbungen werden 300 Projekte für die
              Förderung in Höhe von 1.000 € ausgewählt. Die Auswahlentscheidung
              liegt bei der Stiftung.
            </ListItem>
          </OrderedList>
          <Text color={"gray.500"} mt={"8"}>
            Gern steht Euch das Team der Town & Country Stiftung bei Fragen
            unter der Rufnummer 0361/644 789 14 oder per E-Mail{" "}
            <a href="mailto:stiftungspreis@tc-stiftung.de">
              stiftungspreis@tc-stiftung.de
            </a>{" "}
            zur Verfügung.
          </Text>
          <Text color={"gray.500"} as={"b"} mt={"8"}>
            Wir freuen uns auf Eure Bewerbung und wünschen Euch viel Erfolg!{" "}
          </Text>
          <Text as={"b"} color={"gray.500"}>
            Eure Town &amp; Country Stiftung
          </Text>
        </VStack>
      </CardBody>{" "}
    </Card>
  );
}

export default TeaserText;
