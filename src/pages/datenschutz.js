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
      <Heading size={"lg"}>
        Datenschutzhinweise gem&auml;&szlig; Art. 13 DSGVO
      </Heading>
      <Text>
        Mit Ihrer Bewerbung und Teilnahme am &bdquo;11. Town &amp; Country
        Stiftungspreis&ldquo; sowie der in diesem Zusammenhang
        durchgef&uuml;hrten Veranstaltungen erheben und verarbeiten wir Ihre uns
        mitgeteilten personenbezogenen Daten, auch in Form von Foto-, Ton- und
        Filmaufnahmen.&nbsp;
      </Text>
      <Text>
        Die Datenschutzgrundverordnung (DSGVO) sieht vor, dass wir Sie zum
        Zeitpunkt der Erhebung der Daten &uuml;ber Art und Umfang der
        Verarbeitung und zu Ihren Rechten informieren. Diese Informationen
        stellen wir Ihnen gem&auml;&szlig; Art. 13, 14 DSGVO im Folgenden zur
        Verf&uuml;gung.
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
        <Text>
          Unsere(n) <strong>Datenschutzbeauftragte(n)</strong> erreichen Sie
          postalisch oder per Telefon unter den vorstehenden Kontaktdaten. Die
          E-Mail-Adresse lautet: datenschutzbeauftragter@tc-stiftung.de
        </Text>
      </Box>
      <Heading size={"md"}>
        2. Welche personenbezogenen Daten werden erhoben?&nbsp;
      </Heading>
      <Text>
        Wenn Sie sich zur Teilnahme am 11. Town &amp; Country Stiftungspreis
        bewerben, erheben wir von Ihnen folgende Daten:
      </Text>
      <UnorderedList>
        <ListItem>
          Angaben zum Tr&auml;ger &ndash; Name, Anschrift,
          Vertretungsberechtigte
        </ListItem>
        <ListItem>Freistellungsbescheid</ListItem>
        <ListItem>Angaben zum Projekt&nbsp;</ListItem>
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
          Fotoaufnahmen von den symbolischen Scheck&uuml;bergaben mit oder ohne
          Nennung der Namen der darauf abgebildeten Betroffenen, unter Nennung
          der gemeinn&uuml;tzigen Organisation/Vereinigung,
        </ListItem>
        <ListItem>
          ggf. Foto-, Ton- und Filmaufnahmen im Rahmen der Veranstaltungen vor
          und w&auml;hrend der Town &amp; Country Stiftungsgala mit oder ohne
          Nennung der Namen der darauf abgebildeten Betroffenen sowie unter
          Nennung der gemeinn&uuml;tzigen Organisation/Vereinigung, f&uuml;r die
          der/die Betroffene t&auml;tig ist.
        </ListItem>
      </UnorderedList>
      <Text>
        Nach der Ver&ouml;ffentlichung sind die Daten nicht mehr
        ausschlie&szlig;lich unter der datenschutzrechtlichen Kontrolle der Town
        &amp; Country Stiftung. Die Town &amp; Country Stiftung stellt im Rahmen
        ihrer M&ouml;glichkeiten f&uuml;r ihre eigenen Systeme sicher, dass
        notwendige technische und organisatorische Ma&szlig;nahmen zur
        Vertraulichkeit und Integrit&auml;t der ver&ouml;ffentlichten Daten
        genutzt werden.
      </Text>
      <Heading size={"md"}>
        3. Rechtsgrundlage und Zweck der Erhebung und Verarbeitung
      </Heading>
      <Text>
        Ihre uns im Rahmen des 11. Town &amp; Country Stiftungspreise
        &uuml;bermittelten Daten werden zum Zweck der Teilnahme sowie der
        Vergabe der Auszeichnungen und Preisgelder im Rahmen des 11. Town &amp;
        Country Stiftungspreises verarbeitet. Dar&uuml;ber hinaus werden Ihre
        Daten f&uuml;r die &Ouml;ffentlichkeitsarbeit sowie die
        Berichterstattung &uuml;ber die Arbeit der Town &amp; Country Stiftung,
        &uuml;ber den allj&auml;hrlich stattfindenden Town &amp; Country
        Stiftungspreis, &uuml;ber die Arbeit der einzelnen Preistr&auml;ger
        sowie &uuml;ber die Unterst&uuml;tzung durch die Lizenzpartner der Town
        &amp; Country Haus Lizenzgeber GmbH verarbeitet und dazu im Nachgang in
        diversen Medien, sozialen Netzwerken, Internet, Websites sowie in
        Pressemitteilungen, Newslettern, Brosch&uuml;ren,
        Print-/Digital-Produkten etc. ver&ouml;ffentlicht. Dies ist f&uuml;r
        unsere &Ouml;ffentlichkeitsarbeit erforderlich und dient damit der
        Wahrnehmung berechtigter Interessen der Town &amp; Country Stiftung,
        Art. 6 Abs. 1 lit. f) DSGVO.&nbsp;
      </Text>
      <Text>
        Die Verarbeitung von Foto-, Ton- und Filmaufnahmen, in denen einzelne
        Personen im Vordergrund erkennbar mit oder ohne Nennung ihres Namens
        abgebildet sind, erfolgt auf Grund ausdr&uuml;cklicher Einwilligung
        des/der Betroffenen, mithin gem&auml;&szlig; Art. 6 Abs. 1 lit. a)
        DSGVO.&nbsp;
      </Text>
      <Text>
        Dar&uuml;ber hinaus f&uuml;hren wir auf unserer Homepage ein Fotoarchiv,
        in dem wir die Aufnahmen speichern. Dies gestattet uns Art. 6 Abs. 1
        lit. f) DSGVO, weil wir ein berechtigtes Interesse an der Dokumentation
        unserer Stiftungst&auml;tigkeit sowie der allj&auml;hrlich
        stattfindenden Stiftungspreisvergabe haben.&nbsp;
      </Text>
      <Text>
        Abbildungen, bei denen wir davon ausgehen m&uuml;ssen, dass Sie ein
        eigenes hohes Interesse an der Nichtaufnahme und
        Nichtver&ouml;ffentlichung haben, verarbeiten wir nur mit Einwilligung
        der betroffenen Personen, Art. 6 Abs. 1 lit. a) DSGVO.
      </Text>
      <Heading size={"md"}>4. Weitergabe der personenbezogenen Daten</Heading>
      <Text>
        Eine Weitergabe der von uns erhobenen Daten erfolgt grunds&auml;tzlich
        nur, wenn:
      </Text>
      <UnorderedList>
        <ListItem>
          Sie Ihre nach Art. 6 Abs. 1 S. 1 lit. a DSGVO ausdr&uuml;ckliche
          Einwilligung dazu erteilt haben,
        </ListItem>
        <ListItem>
          die Weitergabe nach Art. 6 Abs. 1 S. 1 lit. f DSGVO zur
          Geltendmachung, Aus&uuml;bung oder Verteidigung von
          Rechtsanspr&uuml;chen erforderlich ist und kein Grund zur Annahme
          besteht, dass Sie ein &uuml;berwiegendes schutzw&uuml;rdiges Interesse
          am Unterbleiben der Weitergabe Ihrer Daten haben,
        </ListItem>
        <ListItem>
          wir nach Art. 6 Abs. 1 S. 1 lit. c DSGVO zur Weitergabe gesetzlich
          verpflichtet sind oder
        </ListItem>
        <ListItem>
          dies gesetzlich zul&auml;ssig und nach Art. 6 Abs. 1 S. 1 lit. b DSGVO
          f&uuml;r die Abwicklung von Vertragsverh&auml;ltnissen mit Ihnen oder
          f&uuml;r die Durchf&uuml;hrung vorvertraglicher Ma&szlig;nahmen
          erforderlich ist.&nbsp;
        </ListItem>
      </UnorderedList>
      <Text>
        Ein Teil der Datenverarbeitung kann durch unsere Dienstleister
        (Rechenzentren, IT-Dienstleister, Sonstige Auftragsdatenverarbeiter
        etc.) erfolgen. Sofern wir Daten an unsere Dienstleister weitergeben,
        d&uuml;rfen diese die Daten ausschlie&szlig;lich zur Erf&uuml;llung
        ihrer Aufgaben verwenden. Die Dienstleister wurden von uns
        sorgf&auml;ltig ausgew&auml;hlt und beauftragt. Sie sind vertraglich an
        unsere Weisungen gebunden, verf&uuml;gen &uuml;ber geeignete technische
        und organisatorische Ma&szlig;nahmen zum Schutz der Rechte der
        betroffenen Personen und werden von uns regelm&auml;&szlig;ig
        kontrolliert.
      </Text>
      <Text>
        Dar&uuml;ber hinaus kann eine Weitergabe in Zusammenhang mit
        beh&ouml;rdlichen Anfragen, Gerichtsbeschl&uuml;ssen und Rechtsverfahren
        erfolgen, wenn Offenbarungs- und Auskunftspflichten unsererseits
        bestehen und/oder es f&uuml;r die Rechtsverfolgung oder -durchsetzung
        erforderlich ist.
      </Text>
      <Text>
        Bei der Verarbeitung werden die Daten an die mit der
        Stiftungst&auml;tigkeit betrauten Botschafter, insbesondere an die
        Lizenzpartner der Town &amp; Country Haus Lizenzgeber GmbH &ndash;
        ausschlie&szlig;lich im Zusammenhang mit dem 11. Town &amp; Country
        Stiftungspreis, insbesondere der Durchf&uuml;hrung einer symbolischen
        Scheck&uuml;bergabe, weitergegeben.&nbsp;
      </Text>
      <Text>
        Personenbezogene Daten werden je nach Anforderung auch an Dritte zur
        dortigen Verarbeitung weitergegeben. Dies betrifft insbesondere die Town
        &amp; Country Haus Lizenzgeber GmbH, Hauptstra&szlig;e 90E, 99820
        H&ouml;rselberg-Hainich OT Behringen sowie deren Lizenzpartner,
        Presseagenturen, Vertrags- und Kooperationspartner der Town &amp;
        Country Stiftung und &ouml;ffentliche Medien &ndash;
        ausschlie&szlig;lich im Zusammenhang mit der Durchf&uuml;hrung des Town
        &amp; Country Stiftungspreises und zum Zwecke der
        &Ouml;ffentlichkeitsarbeit der Town &amp; Country Stiftung.
        Au&szlig;erdem verarbeiten wir die Foto-, Ton- und Filmaufnahmen und
        personenbezogenen Daten auch im Internet, insbesondere auf den Homepages
        der Stiftung (<a href="http://www.tc-stiftung.de">www.tc-stiftung.de</a>
        ), der jeweils betreuten Botschafter und/oder Lizenzpartner der Town
        &amp; Country Haus Lizenzgeber GmbH sowie in den sozialen Netzwerken
        Facebook, Instagram, LinkedIn und YouTube.&nbsp;
      </Text>
      <Heading size={"md"}>5. Daten&uuml;bermittlung an Drittstaaten</Heading>
      <Text>
        Im Rahmen unserer Gesch&auml;ftsbeziehungen k&ouml;nnen ihre
        personenbezogenen Daten an Drittgesellschaften weitergegeben oder
        offengelegt werden. Diese k&ouml;nnen sich auch au&szlig;erhalb der
        Europ&auml;ischen Union (EU) oder des Europ&auml;ischen Wirtschaftsraums
        (EWR), also in Drittl&auml;ndern befinden. Eine solche Verarbeitung im
        Rahmen der Inanspruchnahme von Diensten Dritter oder der Offenlegung
        bzw. &Uuml;bermittlung von Daten an Dritte, erfolgt nur, wenn es zur
        Erf&uuml;llung von vorvertraglichen oder vertraglichen Pflichten, auf
        Grundlage Ihrer Einwilligung, auf Grund einer rechtlichen Verpflichtung
        oder auf Grundlage unserer berechtigten Interessen geschieht.
        Vorbehaltlich gesetzlicher oder vertraglicher Erlaubnisse verarbeiten
        wir oder lassen wir die Daten in einem Drittland nur beim Vorliegen der
        besonderen Voraussetzungen der Art. 44 ff. DSGVO verarbeiten, das
        hei&szlig;t, die Verarbeitung erfolgt auf Grundlage besonderer
        Garantien, wie der offiziell anerkannten Feststellung eines der EU
        entsprechenden Datenschutzniveaus, zum Beispiel durch Zertifizierung des
        Unternehmens nach dem &bdquo;EU-U.S.-Data Privacy Framework&ldquo; oder
        unter Beachtung offiziell anerkannter spezieller vertraglicher
        Verpflichtung (&bdquo;Standardvertragsklausel&ldquo;).&nbsp;
      </Text>
      <Heading size={"md"}> 6.Dauer der Speicherung/L&ouml;schung</Heading>
      <Text>
        Grunds&auml;tzlich speichern wir personenbezogene Daten nur solange, wie
        dies zur Erf&uuml;llung unserer vertraglichen oder gesetzlichen
        Pflichten erforderlich ist, zu denen wir die Daten verarbeitet haben.
        Danach l&ouml;schen wir die Daten unverz&uuml;glich, es sei denn, wir
        ben&ouml;tigen die Daten noch bis zum Ablauf gesetzlicher
        Verj&auml;hrungsfristen, zu Beweiszwecken f&uuml;r zivilrechtliche
        Anspr&uuml;che oder aufgrund von gesetzlichen Aufbewahrungspflichten.
      </Text>
      <Text>
        Zu Beweiszwecken werden wir Ihre Daten mindestens drei Jahre ab Ende des
        Jahres, in dem Ihre Teilnahme am Town &amp; Country Stiftungspreis
        endet, aufbewahren.&nbsp;
      </Text>
      <Text>
        Auch danach m&uuml;ssen wir Ihre Daten teilweise aus buchhalterischen
        oder rechtlichen Gr&uuml;nden speichern. Wir sind dazu wegen
        gesetzlicher Dokumentationspflichten verpflichtet, die sich aus
        dem&nbsp;
      </Text>
      <Text>
        Handelsgesetzbuch, dem B&uuml;rgerlichen Gesetzbuch, der Abgabenordnung,
        und dem Geldw&auml;schegesetz ergeben k&ouml;nnen. Die dort vorgegebenen
        Fristen zur Aufbewahrung von oder zur Nachweisf&uuml;hrung
        ben&ouml;tigten Unterlagen betragen bis zu zehn Jahren, im Falle
        einzelner Anspr&uuml;che bis zu 30 Jahren.
      </Text>
      <Text>
        Foto-, Ton- und Filmaufnahmen, welche f&uuml;r die Zwecke der
        &Ouml;ffentlichkeitsarbeit der Town &amp; Country Stiftung sowie der
        Dokumentation der Stiftungst&auml;tigkeit gemacht werden, werden
        vorbehaltlich eines Widerrufes einer Einwilligung auf unbestimmte Zeit
        zweckgebunden verarbeitet und gespeichert.&nbsp;
      </Text>
      <Heading size={"md"}>7. Ihre Rechte</Heading>
      <Text>
        <strong>Widerrufsrecht:</strong>
      </Text>
      <Text>
        Ihre zur Datenverarbeitung abgegebene Einwilligung k&ouml;nnen Sie
        jederzeit gegen&uuml;ber der Town &amp; Country Stiftung mit Wirkung
        f&uuml;r die Zukunft widerrufen. Wenn Sie Ihre Einwilligung widerrufen,
        werden Ihre Daten nicht mehr auf Basis der Einwilligung verarbeitet. Die
        Zul&auml;ssigkeit der bis zum Widerruf auf Basis Ihrer Einwilligung
        erfolgten Datenverarbeitungen bleibt vom Widerruf unber&uuml;hrt. Den
        Widerruf richten Sie bitte an die Datenschutzbeauftragte der Town &amp;
        Country Stiftung, postalisch: Anger 55/56, 99084 Erfurt, E-Mail:
        datenschutzbeauftragter@tc-stiftung.de oder info@tc-stiftung.de,
        Telefon: 0361 / 644 789 14 und Telefax: 0361 / 644 789 15.
      </Text>
      <Text>Sie haben au&szlig;erdem das Recht:</Text>
      <UnorderedList>
        <ListItem>
          gem. Art. 15 DSGVO <strong>Auskunft</strong> &uuml;ber Ihre von uns
          verarbeiteten personenbezogenen Daten zu verlangen. Insbesondere
          k&ouml;nnen Sie Auskunft &uuml;ber die Verarbeitungszwecke, die
          Kategorie der personenbezogenen Daten, die Kategorien von
          Empf&auml;ngern, gegen&uuml;ber denen Ihre Daten offengelegt wurden
          oder werden, die geplante Speicherdauer, das Bestehen eines Rechts auf
          Berichtigung, L&ouml;schung, Einschr&auml;nkung der Verarbeitung oder
          Widerspruch, das Bestehen eines Beschwerderechts, die Herkunft ihrer
          Daten, sofern diese nicht bei uns erhoben wurden;
        </ListItem>
      </UnorderedList>
      <UnorderedList>
        <ListItem>
          gem. Art. 16 DSGVO unverz&uuml;glich die <strong>Berichtigung</strong>{" "}
          unrichtiger oder Vervollst&auml;ndigung Ihrer bei uns gespeicherten
          personenbezogenen Daten zu verlangen;
        </ListItem>
      </UnorderedList>
      <UnorderedList>
        <ListItem>
          gem. Art. 17 DSGVO die <strong>L&ouml;schung</strong> Ihrer bei uns
          gespeicherten personenbezogenen Daten zu verlangen, soweit nicht die
          Verarbeitung zur Aus&uuml;bung des Rechts auf freie
          Meinungs&auml;u&szlig;erung und Information, zur Erf&uuml;llung einer
          rechtlichen Verpflichtung, aus Gr&uuml;nden des &ouml;ffentlichen
          Interesses oder zur Geltendmachung, Aus&uuml;bung oder Verteidigung
          von Rechtsanspr&uuml;chen erforderlich ist;
        </ListItem>
      </UnorderedList>
      <UnorderedList>
        <ListItem>
          gem. Art. 18 DSGVO die{" "}
          <strong>Einschr&auml;nkung der Verarbeitung</strong> Ihrer
          personenbezogenen Daten zu verlangen, soweit die Richtigkeit der Daten
          von Ihnen bestritten wird, die Verarbeitung unrechtm&auml;&szlig;ig
          ist, Sie jedoch deren L&ouml;schung ablehnen und wir die Daten nicht
          mehr ben&ouml;tigen, Sie jedoch diese zur Geltendmachung,
          Aus&uuml;bung oder Verteidigung von Rechtsanspr&uuml;chen
          ben&ouml;tigen oder Sie gem. Art. 21 DSGVO Widerspruch gegen die
          Verarbeitung eingelegt haben;
        </ListItem>
      </UnorderedList>
      <UnorderedList>
        <ListItem>
          gem. Art. 20 DSGVO Ihre personenbezogenen Daten, die Sie uns
          bereitgestellt haben, in einem strukturierten, g&auml;ngigen und
          maschinenlesebaren Format zu erhalten oder die &Uuml;bermittlung an
          einen anderen Verantwortlichen zu verlangen (
          <strong>Daten&uuml;bertragbarkeit</strong>).&nbsp;
        </ListItem>
      </UnorderedList>
      <UnorderedList>
        <ListItem>
          Soweit wir die Verarbeitung der personenbezogenen Daten auf eine
          Interessenabw&auml;gung st&uuml;tzen, k&ouml;nnen Sie
          <Text as={"b"}> Widerspruch</Text> gem&auml;&szlig; Art. 21 DSGVO
          gegen die Verarbeitung einlegen. Dem Widerspruch werden wir ganz oder
          teilweise entsprechen, wenn triftige Gr&uuml;nde vorhanden sind, die
          einer weiteren Verarbeitung entgegenstehen. Den Widerspruch richten
          Sie bitte an die Datenschutzbeauftragte der Town &amp; Country
          Stiftung, postalisch: Anger 55/56, 99084 Erfurt, E-Mail:
          <em>datenschutzbeauftragter@tc-stiftung.de</em> oder
          <em>info@tc-stiftung.de</em>, Telefon: 0361 / 644 789 14.
        </ListItem>
      </UnorderedList>
      <UnorderedList>
        <ListItem>
          Sie k&ouml;nnen gem. Art. 77 DSGVO <strong>Beschwerde</strong> bei
          einer Aufsichtsbeh&ouml;rde, insbesondere in dem Mitgliedstaat ihres
          Aufenthaltsorts, ihres Arbeitsplatzes, des Orts des mutma&szlig;lichen
          Versto&szlig;es oder unseres Sitzes, erheben, wenn Sie der Ansicht
          sind, dass die Verarbeitung der Sie betreffenden personenbezogenen
          Daten gegen die DSGVO verst&ouml;&szlig;t. Das Beschwerderecht besteht
          unbeschadet eines anderweitigen verwaltungsrechtlichen oder
          gerichtlichen Rechtsbehelfs.
        </ListItem>
      </UnorderedList>
      <Box>
        <Text>Die f&uuml;r uns zust&auml;ndige Aufsichtsbeh&ouml;rde ist:</Text>
        <Text>
          Th&uuml;ringer Landesbeauftragte f&uuml;r den Datenschutz und die
          Informationsfreiheit&nbsp;
        </Text>
        <Text>H&auml;&szlig;lerstr. 8, 99096 Erfurt</Text>
        <Text>
          E-Mail:{" "}
          <a href="mailto:poststelle@datenschutz.thueringen.de">
            poststelle@datenschutz.thueringen.de
          </a>
        </Text>
        <Text>Tel. +49 (0)361-573112900</Text>
      </Box>
      <Text as={"b"}>
        Wir empfehlen Ihnen allerdings, eine Beschwerde zun&auml;chst immer an
        unsere(n) Datenschutzbeauftragte(n) zu richten.
      </Text>
    </Container>
  );
}

export default Datenschutz;
