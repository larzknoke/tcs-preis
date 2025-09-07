import Link from "next/link";
import Image from "next/image";
import {
  Heading,
  Container,
  Text,
  ListItem,
  UnorderedList,
  OrderedList,
  Box,
  Spacer,
} from "@chakra-ui/react";

function Datenschutz() {
  return (
    <Container
      display={"flex"}
      flexDirection={"column"}
      maxWidth={"6xl"}
      gap={6}
      mt={6}
    >
      {" "}
      <Link href="/">
        <Image
          src="/tcs_logo.svg"
          alt="TCS Logo"
          width={80}
          height={24}
          priority
        />
      </Link>
      <Heading size={"lg"}>Datenschutzhinweise gemäß Art. 13 DSGVO</Heading>
      <Text>
        Mit Ihrer Bewerbung und Teilnahme am „12. Town & Country Stiftungspreis“
        oder am „Town & Country Sonderpreis“ sowie der in diesem Zusammenhang
        durchgeführten Veranstaltungen erheben und verarbeiten wir Ihre uns
        mitgeteilten personenbezogenen Daten, auch in Form von Foto-, Ton- und
        Filmaufnahmen.
      </Text>
      <Text>
        Die Datenschutzgrundverordnung (DSGVO) sieht vor, dass wir Sie zum
        Zeitpunkt der Erhebung der Daten über Art und Umfang der Verarbeitung
        und zu Ihren Rechten informieren. Diese Informationen stellen wir Ihnen
        gemäß Art. 13, 14 DSGVO im Folgenden zur Verfügung.
      </Text>
      <Heading size={"md"}>
        1. Kontaktdaten des Verantwortlichen der Datenverarbeitung
      </Heading>
      <Box>
        <Text>Town &amp; Country Stiftung,&nbsp;</Text>
        <Text>vertreten durch den Vorsitzenden Christian Treumann,&nbsp;</Text>
        <Text>Anger 55/56, 99084 Erfurt</Text>
        <Text>Telefon: 0361 / 644 789 14</Text>
        <Text>E-Mail: info@tc-stiftung.de</Text>
        <br />
      </Box>
      <Heading size={"md"}>
        2. Welche personenbezogenen Daten werden erhoben?
      </Heading>
      <Text>
        Wenn Sie sich zur Teilnahme am 12. Town & Country Stiftungspreis
        bewerben, erheben wir von Ihnen folgende Daten:
      </Text>
      <UnorderedList>
        <ListItem>
          Angaben zum Träger – Name, Anschrift, Vertretungsberechtigte
        </ListItem>
        <ListItem>Freistellungsbescheid</ListItem>
        <ListItem>Angaben zum Projekt</ListItem>
        <UnorderedList>
          <ListItem>Name, Anschrift, Website,&nbsp;</ListItem>
          <ListItem>
            Name und Kontaktdaten des Ansprechpartners, Telefon-, Mobilnummer,
            E-Mail-Adresse
          </ListItem>
          <ListItem>Laufzeit und Dauer&nbsp;</ListItem>
          <ListItem>
            Anzahl und T&auml;tigkeitsdauer der beteiligten haupt- und
            ehrenamtlichen Mitarbeiter
          </ListItem>
          <ListItem>Zielsetzung</ListItem>
          <ListItem>Umsetzung/Finanzierung</ListItem>
          <ListItem>Bisherige Ergebnisse</ListItem>
          <ListItem>
            Finanzierungskonzept (Eigenmittel, &ouml;ffentliche und private
            Spenden, Zuwendungen)
          </ListItem>
          <ListItem>Fotos aus der Projektarbeit&nbsp;</ListItem>
        </UnorderedList>
      </UnorderedList>
      <UnorderedList>
        <ListItem>Bankverbindung</ListItem>
        <ListItem>
          Fotoaufnahmen von den symbolischen Scheckübergaben mit oder ohne
          Nennung der Namen der darauf abgebildeten Betroffenen, unter Nennung
          der gemeinnützigen Organisation/Vereinigung,
        </ListItem>
        <ListItem>
          ggf. Foto-, Ton- und Filmaufnahmen im Rahmen der Veranstaltungen vor
          und während der Town & Country Stiftungsgala mit oder ohne Nennung der
          Namen der darauf abgebildeten Betroffenen sowie unter Nennung der
          gemeinnützigen Organisation/Vereinigung, für die der/die Betroffene
          tätig ist.
        </ListItem>
      </UnorderedList>
      <Text>
        Nach der Veröffentlichung sind die Daten nicht mehr ausschließlich unter
        der datenschutzrechtlichen Kontrolle der Town & Country Stiftung. Die
        Town & Country Stiftung stellt im Rahmen ihrer Möglichkeiten für ihre
        eigenen Systeme sicher, dass notwendige technische und organisatorische
        Maßnahmen zur Vertraulichkeit und Integrität der veröffentlichten Daten
        genutzt werden.
      </Text>
      <Heading size={"md"}>
        3. Rechtsgrundlage und Zweck der Erhebung und Verarbeitung
      </Heading>
      <Text>
        Ihre uns im Rahmen des 12. Town & Country Stiftungspreise übermittelten
        Daten werden zum Zweck der Teilnahme sowie der Vergabe der
        Auszeichnungen und Preisgelder im Rahmen des 11. Town & Country
        Stiftungspreises verarbeitet. Darüber hinaus werden Ihre Daten für die
        Öffentlichkeitsarbeit sowie die Berichterstattung über die Arbeit der
        Town & Country Stiftung, über den Town & Country Stiftungspreis, über
        die Arbeit der einzelnen Preisträger sowie über die Unterstützung durch
        die Lizenzpartner der Town & Country Haus Lizenzgeber GmbH verarbeitet
        und dazu im Nachgang in diversen Medien, sozialen Netzwerken, Internet,
        Websites sowie in Pressemitteilungen, Newslettern, Broschüren,
        Print-/Digital-Produkten etc. veröffentlicht. Dies ist für unsere
        Öffentlichkeitsarbeit erforderlich und dient damit der Wahrnehmung
        berechtigter Interessen der Town & Country Stiftung, Art. 6 Abs. 1 lit.
        f DSGVO.
      </Text>
      <Text>
        Die Verarbeitung von Foto-, Ton- und Filmaufnahmen, in denen einzelne
        Personen im Vordergrund erkennbar mit oder ohne Nennung ihres Namens
        abgebildet sind, erfolgt auf Grund ausdrücklicher Einwilligung des/der
        Betroffenen, mithin gemäß Art. 6 Abs. 1 lit. a DSGVO.
      </Text>
      <Text>
        Darüber hinaus führen wir auf unserer Website ein Fotoarchiv, in dem wir
        die Aufnahmen speichern. Dies gestattet uns Art. 6 Abs. 1 lit. f DSGVO,
        weil wir ein berechtigtes Interesse an der Dokumentation unserer
        Stiftungstätigkeit sowie der alljährlich stattfindenden
        Stiftungspreisvergabe haben.
      </Text>
      <Heading size={"md"}>4. Weitergabe der personenbezogenen Daten</Heading>
      <Text>
        Eine Weitergabe der von uns erhobenen Daten erfolgt grundsätzlich nur,
        wenn:
      </Text>
      <UnorderedList>
        <ListItem>
          Sie Ihre nach Art. 6 Abs. 1 S. 1 lit. a DSGVO ausdrückliche
          Einwilligung dazu erteilt haben,
        </ListItem>
        <ListItem>
          die Weitergabe nach Art. 6 Abs. 1 S. 1 lit. f DSGVO zur
          Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen
          erforderlich ist und kein Grund zur Annahme besteht, dass Sie ein
          überwiegendes schutzwürdiges Interesse am Unterbleiben der Weitergabe
          Ihrer Daten haben,
        </ListItem>
        <ListItem>
          wir nach Art. 6 Abs. 1 S. 1 lit. c DSGVO zur Weitergabe gesetzlich
          verpflichtet sind oder
        </ListItem>
        <ListItem>
          dies gesetzlich zulässig und nach Art. 6 Abs. 1 S. 1 lit. b DSGVO für
          die Abwicklung von Vertragsverhältnissen mit Ihnen oder für die
          Durchführung vorvertraglicher Maßnahmen erforderlich ist.
        </ListItem>
      </UnorderedList>
      <Text>
        Ein Teil der Datenverarbeitung kann durch unsere Dienstleister
        (Rechenzentren, IT-Dienstleister, Sonstige Auftragsdatenverarbeiter
        etc.) erfolgen. Sofern wir Daten an unsere Dienstleister weitergeben,
        dürfen diese die Daten ausschließlich zur Erfüllung ihrer Aufgaben
        verwenden. Die Dienstleister wurden von uns sorgfältig ausgewählt,
        beauftragt und werden von uns regelmäßig kontrolliert.
      </Text>
      <Text>
        Darüber hinaus kann eine Weitergabe in Zusammenhang mit behördlichen
        Anfragen, Gerichtsbeschlüssen und Rechtsverfahren erfolgen, wenn
        Offenbarungs- und Auskunftspflichten unsererseits bestehen und/oder es
        für die Rechtsverfolgung oder -durchsetzung erforderlich ist.
      </Text>
      <Text>
        Bei der Verarbeitung werden die Daten an die mit der Stiftungstätigkeit
        betrauten Botschafter, insbesondere an die Lizenzpartner der Town &
        Country Haus Lizenzgeber GmbH – ausschließlich im Zusammenhang mit dem
        12. Town & Country Stiftungspreis, insbesondere der Durchführung einer
        symbolischen Scheckübergabe, weitergegeben.
      </Text>
      <Text>
        Personenbezogene Daten werden je nach Anforderung auch an Dritte zur
        dortigen Verarbeitung weitergegeben. Dies betrifft insbesondere die Town
        & Country Haus Lizenzgeber GmbH, Hauptstraße 90E, 99820
        Hörselberg-Hainich OT Behringen sowie deren Lizenzpartner,
        Presseagenturen, Vertrags- und Kooperationspartner der Town & Country
        Stiftung und öffentliche Medien – ausschließlich im Zusammenhang mit der
        Durchführung des Town & Country Stiftungspreises und zum Zwecke der
        Öffentlichkeitsarbeit der Town & Country Stiftung. Außerdem verarbeiten
        wir die Foto-, Ton- und Filmaufnahmen und personenbezogenen Daten auch
        im Internet, insbesondere auf den Websites der Stiftung
        (www.tc-stiftung.de), der jeweils betreuenden Botschafter und/oder
        Lizenzpartner der Town & Country Haus Lizenzgeber GmbH sowie in den
        sozialen Netzwerken Facebook, Instagram, LinkedIn und YouTube.
      </Text>
      <Heading size={"md"}>5. Daten&uuml;bermittlung an Drittstaaten</Heading>
      <Text>
        Im Rahmen unserer Geschäftsbeziehungen können ihre personenbezogenen
        Daten an Drittgesellschaften weitergegeben oder offengelegt werden.
        Diese können sich auch außerhalb der Europäischen Union (EU) oder des
        Europäischen Wirtschaftsraums (EWR), also in Drittländern befinden. Eine
        solche Verarbeitung im Rahmen der Inanspruchnahme von Diensten Dritter
        oder der Offenlegung bzw. Übermittlung von Daten an Dritte, erfolgt nur,
        wenn es zur Erfüllung von vorvertraglichen oder vertraglichen Pflichten,
        auf Grundlage Ihrer Einwilligung, auf Grund einer rechtlichen
        Verpflichtung oder auf Grundlage unserer berechtigten Interessen
        geschieht. Vorbehaltlich gesetzlicher oder vertraglicher Erlaubnisse
        verarbeiten wir oder lassen wir die Daten in einem Drittland nur beim
        Vorliegen der besonderen Voraussetzungen der Art. 44 ff. DSGVO
        verarbeiten, das heißt, die Verarbeitung erfolgt auf Grundlage
        besonderer Garantien, wie der offiziell anerkannten Feststellung eines
        der EU entsprechenden Datenschutzniveaus, zum Beispiel durch
        Zertifizierung des Unternehmens nach dem „EU-U.S.-Data Privacy
        Framework“ oder unter Beachtung offiziell anerkannter spezieller
        vertraglicher Verpflichtung („Standardvertragsklausel“).
      </Text>
      <Heading size={"md"}> 6.Dauer der Speicherung/L&ouml;schung</Heading>
      <Text>
        Grundsätzlich speichern wir personenbezogene Daten nur solange, wie dies
        zur Erfüllung unserer vertraglichen oder gesetzlichen Pflichten
        erforderlich ist, zu denen wir die Daten verarbeitet haben. Danach
        löschen wir die Daten unverzüglich, es sei denn, wir benötigen die Daten
        noch bis zum Ablauf gesetzlicher Verjährungsfristen, zu Beweiszwecken
        für zivilrechtliche Ansprüche oder aufgrund von gesetzlichen
        Aufbewahrungspflichten. Zu Beweiszwecken werden wir Ihre Daten
        mindestens drei Jahre ab Ende des Jahres, in dem Ihre Teilnahme am Town
        & Country Stiftungspreis endet, aufbewahren.
      </Text>
      <Text>
        Auch danach müssen wir Ihre Daten teilweise aus buchhalterischen oder
        rechtlichen Gründen speichern. Wir sind dazu wegen gesetzlicher
        Dokumentationspflichten verpflichtet, die sich aus dem
        Handelsgesetzbuch, dem Bürgerlichen Gesetzbuch, der Abgabenordnung, und
        dem Geldwäschegesetz ergeben können. Die dort vorgegebenen Fristen zur
        Aufbewahrung von oder zur Nachweisführung benötigten Unterlagen betragen
        bis zu zehn Jahren, im Falle einzelner Ansprüche bis zu 30 Jahren.
      </Text>
      <Text>
        Foto-, Ton- und Filmaufnahmen, welche für die Zwecke der
        Öffentlichkeitsarbeit der Town & Country Stiftung sowie der
        Dokumentation der Stiftungstätigkeit gemacht werden, werden
        vorbehaltlich eines Widerrufes einer Einwilligung auf unbestimmte Zeit
        zweckgebunden verarbeitet und gespeichert.
      </Text>
      <Heading size={"md"}>7. Ihre Rechte</Heading>
      <UnorderedList>
        <ListItem>Recht auf Auskunft gem. Art. 15 DSGVO</ListItem>
        <ListItem>Recht auf Berichtigung gem. Art. 16 DSGVO</ListItem>
        <ListItem>Recht auf Löschung gem. Art. 17 DSGVO </ListItem>
        <ListItem>
          Recht auf Einschränkung der Verarbeitung gem. Art. 18 DSGVO{" "}
        </ListItem>
        <ListItem>Recht auf Datenübertragbarkeit gem. Art. 20 DSGVO</ListItem>
        <ListItem>Recht auf Widerspruch gemäß Art. 21 DSGVO</ListItem>
      </UnorderedList>
      <Text>
        <strong>Widerrufsrecht:</strong>
      </Text>
      <Text>
        Ihre zur Datenverarbeitung abgegebene Einwilligung können Sie jederzeit
        gegenüber der Town & Country Stiftung mit Wirkung für die Zukunft
        widerrufen. Wenn Sie Ihre Einwilligung widerrufen, werden Ihre Daten
        nicht mehr auf Basis der Einwilligung verarbeitet. Die Zulässigkeit der
        bis zum Widerruf auf Basis Ihrer Einwilligung erfolgten
        Datenverarbeitungen bleibt vom Widerruf unberührt. Den Widerruf richten
        Sie bitte an die Town & Country Stiftung, postalisch: Anger 55/56, 99084
        Erfurt, E-Mail: info@tc-stiftung.de, Telefon: 0361 644 789 14 und
        Telefax: 0361 644 789 15.
      </Text>
      <Text>
        <strong>Beschwerderecht bei der Aufsichtsbehörde:</strong>
      </Text>
      <Text>
        Sie können gem. Art. 77 DSGVO Beschwerde bei einer Aufsichtsbehörde
        erheben, wenn Sie der Ansicht sind, dass die Verarbeitung der Sie
        betreffenden personenbezogenen Daten gegen die DSGVO verstößt.
      </Text>
      <Text>
        Die für uns zuständige Aufsichtsbehörde ist: <br />
        Thüringer Landesbeauftragte für den Datenschutz und die
        Informationsfreiheit <br />
        Häßlerstr. 8, 99096 Erfurt,
        <br /> E-Mail: poststelle@datenschutz.thueringen.de, <br />
        Tel. +49 (0)361-573112900
      </Text>
      <Text as={"b"}>
        Wir empfehlen Ihnen allerdings, eine Beschwerde zunächst immer an{" "}
        <Link href={"mailto:info@tc-stiftung.de"}>info@tc-stiftung.de</Link> zu
        richten.
      </Text>
    </Container>
  );
}

export default Datenschutz;
