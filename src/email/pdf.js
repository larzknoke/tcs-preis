import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import { dateFormatter } from "@/lib/utils";

// Create styles
const styles = StyleSheet.create({
  page: {
    fontSize: 10,
    fontFamily: "Open Sans",
  },
  section: {
    margin: 15,
    padding: 15,
  },
  title: {
    fontWeight: 600,
    fontSize: 14,
    marginBottom: 10,
  },
  subTitle: {
    fontWeight: 600,
    marginBottom: 10,
  },
  image: {
    width: "100px",
    margin: 5,
  },
});

Font.register({
  family: "Open Sans",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
      fontWeight: 600,
    },
  ],
});

export const LetterPDF = ({ letter }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Image
          style={styles.image}
          src={"https://stiftungspreis.tc-stiftung.de/logo.png"}
        />
        <Text style={styles.title}>11. Town & Country Stiftungspreis</Text>
        <Text style={styles.subTitle}>
          {`Folgende Daten zu Ihrer Bewerbung vom ${dateFormatter(
            letter.createdAt
          )} wurden gespeichert:`}
        </Text>
        <Text>{`ID: ${letter.id}`}</Text>
        <Text>{`Erstellt am: ${letter.createdAt}`}</Text>
        <Text>{`Andere Lizenzpartner: ${letter.andereLizenzpartner}`}</Text>
        <Text>{`Name Träger: ${letter.nameTraeger}`}</Text>
        <Text>{`Vorstand Träger: ${letter.vorstandTraeger}`}</Text>
        <Text>{`Strasse Träger: ${letter.strasseTraeger}`}</Text>
        <Text>{`PLZ Träger: ${letter.plzTraeger}`}</Text>
        <Text>{`Ort Träger: ${letter.ortTraeger}`}</Text>
        <Text>{`Bundesland Träger: ${letter.bundeslandTraeger}`}</Text>
        <Text>{`Verein: ${letter.vereinTraeger}`}</Text>
        <Text>{`Organisation Projekt: ${letter.organisationProjekt}`}</Text>
        <Text>{`Name Projekt ${letter.nameProjekt}`}</Text>
        <Text>{`Ansprechpartner Projekt: ${letter.ansprechpartnerProjekt}`}</Text>
        <Text>{`Telefonnummer Projekt: ${letter.telefonnummerProjekt}`}</Text>
        <Text>{`Mobil Projekt: ${letter.mobilProjekt}`}</Text>
        <Text>{`Email Projekt: ${letter.emailProjekt}`}</Text>
        <Text>{`Internet Projekt: ${letter.wwwProjekt}`}</Text>
        <Text>{`IBAN Projekt: ${letter.ibanProjekt}`}</Text>
        <Text>{`Konto Name Projekt: ${letter.kontoNameProjekt}`}</Text>
        <Text>{`Bank Projekt: ${letter.bankNameProjekt}`}</Text>
        <Text>{`Strasse Projekt: ${letter.strasseProjekt}`}</Text>
        <Text>{`PLZ Projekt: ${letter.plzProjekt}`}</Text>
        <Text>{`Ort Projekt: ${letter.ortProjekt}`}</Text>
        <Text>{`Bundesland Projekt: ${letter.bundeslandProjekt}`}</Text>
        <Text>{`Wann Projekt: ${letter.wannProjekt}`}</Text>
        <Text>{`Mitarbeiter Projekt: ${letter.mitarbeiterProjekt}`}</Text>
        <Text>{`Hauptamtlich Anzahl: ${letter.hauptamtlichAnzahl}`}</Text>
        <Text>{`Hauptamtlich Stunden: ${letter.hauptamtlichStunden}`}</Text>
        <Text>{`Ehrenamtlich Anzahl: ${letter.ehrenamtlichAnzahl}`}</Text>
        <Text>{`Ehrenamtlich Stunden: ${letter.ehrenamtlichStunden}`}</Text>
        <Text>{`Beschreibung Projekt: ${letter.beschreibungProjekt}`}</Text>
        <Text>{`Zielsetzung Projekt: ${letter.zielsetzungProjekt}`}</Text>
        <Text>{`Benachteiligung Projekt: ${letter.benachteiligungProjekt}`}</Text>
        <Text>{`Umsetzung Projekt: ${letter.umsetzungProjekt}`}</Text>
        <Text>{`Bisherige Ergebnisse: ${letter.bisherigeErgebnisse}`}</Text>
        <Text>{`Eigenmittel: ${letter.eigenmittel}`}</Text>
        <Text>{`ÖffentlicheZuwendungen: ${letter.oeffentlicheZuwendungen}`}</Text>
        <Text>{`PrivateSpenden: ${letter.privateSpenden}`}</Text>
        <Text>{`Bisherige Förderung: ${letter.bisherigeFoerderung}`}</Text>
        <Text>{`Andere Zuwendungen: ${letter.zuwendungAndere}`}</Text>
      </View>
    </Page>
  </Document>
);
