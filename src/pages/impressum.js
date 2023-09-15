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

function Impressum() {
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
      <Heading size={"lg"}>Impressum</Heading>
      <Text>
        Town &amp; Country Stiftung <br /> Stiftung bürgerlichen Rechts <br />
        Hauptstraße 90 E <br />
        99820 Hörselberg – Hainich OT Behringen
      </Text>
      <Text>
        Vorstand: Christian Treumann (Vorsitzender) <br /> Sylvia Wagner <br />{" "}
        Dietmar Jonas
      </Text>
      <Text>
        Telefon: 03 61 / 644 78 914 <br />
        Telefax: 03 61 / 644 78 915 <br />
        info@tc-stiftung.de <br /> www.tc-stiftung.de
      </Text>
      <Text>
        Postadresse: <br /> Anger 55/56 <br /> 99084 Erfurt
      </Text>
      <Text>
        Inhaltlich Verantwortlicher gemäß § 55 Absatz 2 RStV: Christian
        Treumann, Vorstand, Gabriele Dawo, Town &amp; Country Haus Lizenzgeber
        GmbH, Hauptstraße 90 E, 99820 Hörselberg-Hainich OT Behringen
      </Text>
      <Heading size={"md"}>Vertretungsberechtigung</Heading>
      <Text>
        Der Vorstand: <br />
        Christian Treumann (Vorsitzender) <br />
        Sylvia Wagner <br />
        Dietmar Jonas
      </Text>
      <Text>
        Die Anerkennung der Town &amp; Country Stiftung erfolgte am 17.06.2009
        durch das Innenministerium des Freistaates Thüringen. Durch Mitteilung
        des Finanzamtes Mühlhausen wurde der Stiftung bestätigt, dass deren
        Satzungszwecke dem Gemeinnützigkeitsrecht Genüge tun.
      </Text>
      <Text>
        Haftungshinweise <br />
        Die Town &amp; Country Stiftung ist bemüht, auf ihrer Website stets
        richtige und aktuelle Informationen bereitzustellen und ändert oder
        ergänzt diese bei Bedarf laufend und ohne vorherige Ankündigung. Dennoch
        kann die Town &amp; Country Stiftung für Korrektheit, Aktualität und
        Vollständigkeit keine Haftung übernehmen.
      </Text>
      <Text>
        Trotz sorgfältiger inhaltlicher Kontrolle übernimmt die Town &amp;
        Country Stiftung ebenfalls keine Haftung für die Inhalte externer Links.
        Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber
        verantwortlich.
      </Text>
    </Container>
  );
}

export default Impressum;
