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
  bold: {
    fontWeight: 700,
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
        <Text style={styles.title}>
          {letter.sonderpreis
            ? "Sonderpreis Town & Country Stiftung"
            : "12. Town & Country Stiftungspreis"}
        </Text>
        <Text style={styles.subTitle}>
          {`Folgende Daten zu Eurer Bewerbung vom ${dateFormatter(
            letter.createdAt
          )} wurden gespeichert:`}
        </Text>
        <Text>
          <Text style={styles.bold}>ID: </Text>
          {letter.id}
        </Text>
        <Text>
          <Text style={styles.bold}>Erstellt am: </Text>{" "}
          {dateFormatter(letter.createdAt)}
        </Text>
        <Text>
          <Text style={styles.bold}>Andere Lizenzpartner: </Text>
          {letter.andereLizenzpartner}
        </Text>
        <Text>
          <Text style={styles.bold}>Name Träger: </Text> {letter.nameTraeger}
        </Text>
        <Text>
          <Text style={styles.bold}>Vorstand Träger: </Text>
          {letter.vorstandTraeger}
        </Text>
        <Text>
          <Text style={styles.bold}>Strasse Träger: </Text>
          {letter.strasseTraeger}
        </Text>
        <Text>
          <Text style={styles.bold}>PLZ Träger: </Text> {letter.plzTraeger}
        </Text>
        <Text>
          <Text style={styles.bold}>Ort Träger: </Text> {letter.ortTraeger}
        </Text>
        <Text>
          <Text style={styles.bold}>Bundesland Träger: </Text>
          {letter.bundeslandTraeger}
        </Text>
        <Text>
          <Text style={styles.bold}>Verein: </Text> {letter.vereinTraeger}
        </Text>
        <Text>
          <Text style={styles.bold}>Organisation Projekt: </Text>
          {letter.organisationProjekt}
        </Text>
        <Text>
          <Text style={styles.bold}>Name Projekt</Text> {letter.nameProjekt}
        </Text>
        <Text>
          <Text style={styles.bold}>Ansprechpartner Projekt: </Text>
          {letter.ansprechpartnerProjekt}
        </Text>
        <Text>
          <Text style={styles.bold}>Telefonnummer Projekt: </Text>
          {letter.telefonnummerProjekt}
        </Text>
        <Text>
          <Text style={styles.bold}>Mobil Projekt: </Text> {letter.mobilProjekt}
        </Text>
        <Text>
          <Text style={styles.bold}>Email Projekt: </Text> {letter.emailProjekt}
        </Text>
        <Text>
          <Text style={styles.bold}>Internet Projekt: </Text>
          {letter.wwwProjekt}
        </Text>
        <Text>
          <Text style={styles.bold}>IBAN Projekt: </Text> {letter.ibanProjekt}
        </Text>
        <Text>
          <Text style={styles.bold}>Konto Name Projekt: </Text>
          {letter.kontoNameProjekt}
        </Text>
        <Text>
          <Text style={styles.bold}>Bank Projekt: </Text>
          {letter.bankNameProjekt}
        </Text>
        <Text>
          <Text style={styles.bold}>Strasse Projekt: </Text>
          {letter.strasseProjekt}
        </Text>
        <Text>
          <Text style={styles.bold}>PLZ Projekt: </Text> {letter.plzProjekt}
        </Text>
        <Text>
          <Text style={styles.bold}>Ort Projekt: </Text> {letter.ortProjekt}
        </Text>
        <Text>
          <Text style={styles.bold}>Bundesland Projekt: </Text>
          {letter.bundeslandProjekt}
        </Text>
        <Text>
          <Text style={styles.bold}>Wann Projekt: </Text> {letter.wannProjekt}
        </Text>
        <Text>
          <Text style={styles.bold}>Mitarbeiter Projekt: </Text>
          {letter.mitarbeiterProjekt}
        </Text>
        <Text>
          <Text style={styles.bold}>Hauptamtlich Anzahl: </Text>
          {letter.hauptamtlichAnzahl}
        </Text>
        <Text>
          <Text style={styles.bold}>Hauptamtlich Stunden: </Text>
          {letter.hauptamtlichStunden}
        </Text>
        <Text>
          <Text style={styles.bold}>Ehrenamtlich Anzahl: </Text>
          {letter.ehrenamtlichAnzahl}
        </Text>
        <Text>
          <Text style={styles.bold}>Ehrenamtlich Stunden: </Text>
          {letter.ehrenamtlichStunden}
        </Text>
        <Text>
          <Text style={styles.bold}>Beschreibung Projekt: </Text>
          {letter.beschreibungProjekt}
        </Text>
        <Text>
          <Text style={styles.bold}>Zielsetzung Projekt: </Text>
          {letter.zielsetzungProjekt}
        </Text>
        <Text>
          <Text style={styles.bold}>Benachteiligung Projekt: </Text>
          {letter.benachteiligungProjekt}
        </Text>
        <Text>
          <Text style={styles.bold}>Umsetzung Projekt: </Text>
          {letter.umsetzungProjekt}
        </Text>
        <Text>
          <Text style={styles.bold}>Bisherige Ergebnisse: </Text>
          {letter.bisherigeErgebnisse}
        </Text>
        {letter.sonderpreis && (
          <Text>
            <Text style={styles.bold}>Nachhaltigkeit: </Text>
            {letter.nachhaltigkeitProjekt}
          </Text>
        )}
        {letter.sonderpreis && (
          <Text>
            <Text style={styles.bold}>Übertragbarkeit: </Text>
            {letter.uebertragbarkeitProjekt}
          </Text>
        )}
        <Text>
          <Text style={styles.bold}>Eigenmittel: </Text> {letter.eigenmittel}
        </Text>
        <Text>
          <Text style={styles.bold}>ÖffentlicheZuwendungen: </Text>
          {letter.oeffentlicheZuwendungen}
        </Text>
        <Text>
          <Text style={styles.bold}>PrivateSpenden: </Text>
          {letter.privateSpenden}
        </Text>
        <Text>
          <Text style={styles.bold}>Bisherige Förderung: </Text>
          {letter.bisherigeFoerderung}
        </Text>
        <Text>
          <Text style={styles.bold}>Andere Zuwendungen: </Text>
          {letter.zuwendungAndere}
        </Text>
      </View>
    </Page>
  </Document>
);
