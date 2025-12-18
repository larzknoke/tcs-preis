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
        Mit Ihrer Zusage und Teilnahme an dem von der Town & Country Stiftung am
        09.05.2026 durchgeführten Galaabend anlässlich des 12. Town & Country
        Stiftungspreises erheben und verarbeiten wir personenbezogene Daten. Die
        Datenschutzgrundverordnung (DSGVO) sieht vor, dass wir Sie zum Zeitpunkt
        der Erhebung der Daten über Art und Umfang der Verarbeitung und zu Ihren
        Rechten wie folgt informieren:
      </Text>
      <Heading size={"md"}>1. Datenschutzrechtlich Verantwortlicher</Heading>
      <Box>
        <Text>Town & Country Stiftung Stiftung</Text>
        <Text>bürgerlichen Rechts</Text>
        <Text>Herr Christian Treumann</Text>
        <Text>Hauptstr. 90 E, 99820 Hörselberg-Hainich OT Behringen</Text>
        <Text>
          Telefon: 0361-644 789 14, Telefax:0361-644 789 15, E-Mail:
          info@tc-stiftung.de
        </Text>
        <br />
      </Box>
      <Heading size={"md"}>
        2. Rechtsgrundlage und Zweck der Erhebung und Verarbeitung
      </Heading>
      <Text>
        Die von Ihnen auf unserer Einladung angegebenen personenbezogenen Daten
        verarbeiten wir zum Zwecke der Vorbereitung und Durchführung der
        vorgenannten Veranstaltung. Die Verarbeitung erfolgt zur Wahrnehmung
        berechtigter Interessen der Town &Country Stiftung, Art. 6 Abs. 1 lit. f
        DSGVO sowie auf Grund einer Einwilligung des/der Betroffenen gemäß Art.
        6 Abs. 1 lit. a DSGVO.
      </Text>
      <Text>
        Einzelne ausgewählte Fotos, Film- und Tonaufnahmen der vorgenannten
        Veranstaltung werden für Zwecke der Öffentlichkeitsarbeit sowie der
        Berichterstattung über die Arbeit der Town & Country Stiftung, über den
        alljährlich stattfindenden Stiftungspreis sowie über die Arbeit der
        einzelnen Preisträger verwertet und dazu im Nachgang in diversen Medien,
        sozialen Netzwerken, Internet, Websites sowie in Pressemitteilungen,
        Newslettern, Broschüren, Print-Produkten etc. erstellt und
        veröffentlicht. Dies ist für unsere Öffentlichkeitsarbeit erforderlich
        und dient damit der Wahrnehmung berechtigter Interessen der Town &
        Country Stiftung, Art. 6 Abs. 1 lit. f DSGVO.
      </Text>
      <Text>
        Die Verarbeitung von Fotos, Film- und Tonaufnahmen, in denen einzelne
        Personen im Vordergrund erkennbar mit oder ohne Nennung ihres Namens
        abgebildet sind, erfolgt auf Grund einer Einwilligung des/der
        Betroffenen, mithin gemäß Art. 6 Abs. 1 lit. a DSGVO.
      </Text>
      <Text>
        Da die Öffentlichkeitsarbeit für die Town & Country Stiftung notwendig
        ist, um Spender und Zustifter zu informieren und zu gewinnen, auch um
        die weitere Durchführung des Town & Country Stiftungspreises zur
        Förderung benachteiligter Kinder zu ermöglichen, gehen wir davon aus,
        dass aus Ihrer Sicht keine generellen Gründe gegen Foto-, Film- und
        Tonaufnahmen und die Verarbeitung zu den vorstehend beschriebenen
        Zwecken bestehen. Sollte das dennoch der Fall sein, wenden Sie sich
        bitte umgehend an die Town & Country Stiftung per E-Mail an:
        info@tc-stiftung.de oder telefonisch: 0361- 644789 14.
      </Text>
      <Text>
        Darüber hinaus führen wir auf unserer Homepage ein Fotoarchiv, in dem
        wir die Aufnahmen speichern. Dies gestattet uns Art. 6 Abs. 1 lit. f
        DSGVO, weil wir ein berechtigtes Interesse an der Dokumentation unserer
        Stiftungstätigkeit sowie der alljährlich stattfindenden
        Stiftungspreisvergabe haben.
      </Text>
      <Text>
        Internetveröffentlichungen ermöglichen Dritten, die Daten weltweit
        abzurufen, zu kopieren, weiterzuverarbeiten oder abzuändern. Nach der
        Veröffentlichung sind die Daten somit nicht mehr ausschließlich unter
        der datenschutzrechtlichen Kontrolle der Town & Country Stiftung. Die
        Town & Country Stiftung stellt im Rahmen ihrer Möglichkeiten und für
        ihre eigenen Systeme sicher, dass notwendige technische und
        organisatorische Maßnahmen genutzt werden, um die Vertraulichkeit und
        die Integrität Ihrer personenbezogenen Daten zu schützen.
      </Text>
      <Heading size={"md"}>
        3. Welche personenbezogenen Daten verarbeiten wir?
      </Heading>
      <Text>
        Zu den unter 2. genannten Zwecken verarbeiten wir die von Ihnen auf der
        Einladung angegebenen personenbezogenen Daten, auch von dort angegebenen
        Begleitpersonen sowie Foto-, Film- und Tonaufnahmen mit oder ohne
        Nennung der Namen der darauf abgebildeten Betroffenen sowie unter
        Nennung der gemeinnützigen Initiative/Vereinigung, für die der/die
        Betroffene tätig ist.
      </Text>
      <Heading size={"md"}>
        4. Interne Empfänger der personenbezogenen Daten
      </Heading>
      <Text>
        Bei der Verarbeitung werden die Daten an die mit der Stiftungstätigkeit
        betrauten Botschafter, insbesondere an die Lizenz- und Franchise-Partner
        der Town & Country Haus Lizenzgeber GmbH – ausschließlich im
        Zusammenhang mit den vorstehenden Veranstaltungen und zum Zwecke der
        Öffentlichkeitsarbeit der Town & Country Stiftung – weitergegeben.
      </Text>
      <Heading size={"md"}>
        5. Externe Empfänger der personenbezogenen Daten
      </Heading>
      <Text>
        Personenbezogene Daten werden je nach Anforderung auch an Dritte zur
        dortigen Verarbeitung weitergegeben. Dies betrifft bezüglich der Fotos,
        Film- und Tonaufnahmen insbesondere die Town & Country Haus Lizenzgeber
        GmbH und deren Lizenz- und Franchise-Partner, Presseagenturen,
        Kooperationspartner und öffentliche Medien – ausschließlich im
        Zusammenhang mit der vorstehenden Veranstaltung und zum Zwecke der
        Öffentlichkeitsarbeit der Town & Country Stiftung. Außerdem
        veröffentlichen wir die personenbezogenen Daten auch im Internet,
        insbesondere auf unserer Homepage www.tc-stiftung.de sowie in sozialen
        Netzwerken. Die Town & Country Haus Lizenzgeber GmbH und deren Lizenz-
        und Franchise-Partner sind mit Ihrer Einwilligung berechtigt, die Foto-,
        Film- und Tonaufnahmen zum Zwecke der eigenen Öffentlichkeitsarbeit im
        Zusammenhang mit der vorstehenden Veranstaltung ebenfalls im
        beschriebenen Umfang zu nutzen.
      </Text>
      <Text>
        Ein Teil der Datenverarbeitung kann durch unsere Dienstleister
        (Rechenzentren, IT-Dienstleister etc.) erfolgen, die die Daten
        ausschließlich zur Erfüllung ihrer Aufgaben verwenden dürfen. Die
        Dienstleister wurden von uns sorgfältig ausgewählt und beauftragt. Sie
        sind vertraglich an unsere Weisungen gebunden, verfügen über geeignete
        technische und organisatorische Maßnahmen zum Schutz der Rechte der
        betroffenen Personen und werden von uns regelmäßig kontrolliert.
      </Text>
      <Text>
        Darüber hinaus kann eine Weitergabe im Zusammenhang mit behördlichen
        Anfragen, Gerichtsbeschlüssen und Rechtsverfahren erfolgen, wenn
        Offenbarungs- und Auskunftspflichten unsererseits bestehen und/oder es
        für die Rechtsverfolgung oder -durchsetzung erforderlich ist.
      </Text>
      <Heading size={"md"}>
        6. Übermittlung von personenbezogenen Daten an ein Drittland
      </Heading>
      <Text>
        Im Rahmen unserer Geschäftsbeziehungen können Ihre personenbezogenen
        Daten an Drittgesellschaften weitergegeben oder offengelegt werden.
        Diese können sich auch außerhalb der Europäischen Union (EU) oder des
        Europäischen Wirtschaftsraums (EWR), also in Drittländern befinden. Eine
        solche Verarbeitung im Rahmen der Inanspruchnahme von Diensten Dritter
        oder der Offenlegung bzw. Übermittlung von Daten an Dritte, erfolgt nur,
        wenn es zur Erfüllung von vorvertraglichen oder vertraglichen Pflichten,
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
      <Heading size={"md"}>7. Dauer der Speicherung/Löschung</Heading>
      <Text>
        Fotos, Film- und Tonaufnahmen, welche für die Zwecke der
        Öffentlichkeitsarbeit der Town & Country Stiftung sowie der
        Dokumentation der Stiftungstätigkeit gemacht werden, werden
        vorbehaltlich eines Widerrufes einer Einwilligung auf unbestimmte Zeit
        zweckgebunden verarbeitet und gespeichert. Die personenbezogenen Daten
        werden gelöscht, sobald sie für den Zweck der Verarbeitung nicht mehr
        benötigt werden, wenn nicht gesetzliche Aufbewahrungsfristen etwas
        anderes bestimmen.
      </Text>
      <Heading size={"md"}>8. Ihre Rechte</Heading>
      <Text>
        Ihre zur Datenverarbeitung abgegebene Einwilligung können Sie jederzeit
        gegenüber der Town & Country Stiftung mit Wirkung für die Zukunft
        widerrufen. Wenn Sie Ihre Einwilligung widerrufen, werden Ihre Daten
        nicht mehr auf Basis der Einwilligung verarbeitet. Die Zulässigkeit der
        bis zum Widerruf auf Basis Ihrer Einwilligung erfolgten
        Datenverarbeitungen bleibt vom Widerruf unberührt. Den Widerruf richten
        Sie bitte an den datenschutzrechtlichen Verantwortlichen der Town &
        Country Stiftung, postalisch: Anger 55/56, 99084 Erfurt, E-Mail:
        info@tc-stiftung.de, Telefon: 0361/644 789 14 oder Telefax: 0361/644 789
        15.
      </Text>
      <Text>
        <strong>
          Sie haben folgende Rechte hinsichtlich der Sie betreffenden Daten:
        </strong>
      </Text>
      <UnorderedList mt={-4}>
        <ListItem>Recht auf Auskunft nach Art. 15 DSGVO</ListItem>
        <ListItem>Recht auf Berichtigung nach Art. 16 DSGVO</ListItem>
        <ListItem>Recht auf Löschung nach Art. 17 DSGVO</ListItem>
        <ListItem>
          Recht auf Einschränkung der Verarbeitung nach Art. 18 DSGVO
        </ListItem>
        <ListItem>Recht auf Datenübertragbarkeit nach Art. 20 DSGVO</ListItem>
        <ListItem>Recht aus Widerspruch nach Art. 21 DSGVO</ListItem>
        <ListItem>Beschwerderecht bei der Aufsichtsbehörde</ListItem>
      </UnorderedList>
      <Text>
        Sie haben nach Art. 77 DSGVO das Recht, sich bei der Aufsichtsbehörde zu
        beschweren, wenn Sie der Ansicht sind, dass die Verarbeitung der Sie
        betreffenden personenbezogenen Daten nicht rechtmäßig erfolgt. Die für
        uns zuständige Aufsichtsbehörde ist: Thüringer Landesbeauftragter für
        den Datenschutz und die Informationsfreiheit, Häßlerstr. 8, 99096
        Erfurt, E-Mail: poststelle@datenschutz.thueringen.de, Tel.:
        0361-573112900. <br /> Wir empfehlen, eine Beschwerde zunächst immer an
        unseren datenschutzrechtlichen Verantwortlichen zu richten.
      </Text>
      <Heading size={"md"}> 9. Keine Pflicht zur Bereitstellung</Heading>
      <Text>
        Die Bereitstellung der vorgenannten Daten zu den in diesen Hinweisen
        genannten Zwecken ist weder gesetzlich noch vertraglich vorgeschrieben
        noch in diesem Zusammenhang zu einem Vertragsschluss erforderlich.
        Soweit die Einverständniserklärungen nicht erteilt werden, ist eine
        Teilnahme an dem Galaabend nur eingeschränkt möglich.
      </Text>
    </Container>
  );
}

export default Datenschutz;
