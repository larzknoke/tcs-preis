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
  },
  subTitle: {
    fontWeight: 600,
    marginBottom: 10,
  },
  image: {
    width: "100px",
    margin: 5,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    gap: 10,
  },
  col: {},
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

export const LetterBotPDF = ({ letter }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Image
            style={styles.image}
            src={
              process.env.NODE_ENV === "development"
                ? "http://localhost:3000/logo.png"
                : "https://stiftungspreis.tc-stiftung.de/logo.png"
            }
          />
          <Text style={styles.subTitle}>12. Town & Country Stiftungspreis</Text>
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text>{`Bundesland Träger: ${letter.bundeslandTraeger} \n`}</Text>
          <Text>{`Bundesland Projekt: ${
            letter.bundeslandProjekt ? letter.bundeslandProjekt : "-"
          }`}</Text>
        </View>
        <View style={{ fontWeight: 600, marginBottom: 20, fontSize: 12 }}>
          <Text>Projekt-Nr.: {letter.id}</Text>
          <Text>Träger: {letter.nameTraeger}</Text>
          <Text>Projekt: {letter.nameProjekt ? letter.nameProjekt : "-"}</Text>
        </View>
        {/* <View style={{ marginBottom: 20 }}>
          <Text>Botschafter-Nr.: {letter.botschafter.id}</Text>
          <Text>
            Botschafter: {letter.botschafter.vorname} {letter.botschafter.name}
          </Text>
        </View> */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontWeight: 600, marginBottom: 10, fontSize: 12 }}>
            Träger:
          </Text>
          {[
            ["nameTraeger", "Name Träger"],
            ["vorstandTraeger", "Vorstand Träger"],
            ["strasseTraeger", "Straße Träger"],
            ["plzTraeger", "PLZ Träger"],
            ["ortTraeger", "Ort Träger"],
            ["bundeslandTraeger", "Bundesland Träger"],
            ["vereinTraeger", "Verein Träger"],
          ].map((el) => {
            return (
              <>
                <Text style={{ fontWeight: 600 }}>{el[1]}</Text>
                <Text style={{ marginBottom: 5 }}>
                  {letter[el[0]] ? letter[el[0]] : "-"}
                </Text>
              </>
            );
          })}
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontWeight: 600, marginBottom: 10, fontSize: 12 }}>
            Projekt:
          </Text>
          {[
            ["organisationProjekt", "Organisation Projekt"],
            ["nameProjekt", "Name Projekt"],
            ["ansprechpartnerProjekt", "Ansprechpartner Projekt"],
            ["telefonnummerProjekt", "Telefon Projekt"],
            ["mobilProjekt", "Mobil Projekt"],
            ["emailProjekt", "Email Projekt"],
            ["wwwProjekt", "Internet Projekt"],
            ["ibanProjekt", "IBAN Projekt"],
            ["kontoNameProjekt", "Konto Name Projekt"],
            ["bankNameProjekt", "Bank Name Projekt"],
            ["strasseProjekt", "Straße Projekt"],
            ["plzProjekt", "PLZ Projekt"],
            ["ortProjekt", "Ort Projekt"],
            ["bundeslandProjekt", "Bundesland Projekt"],
            ["wannProjekt", "Wann Projekt"],
            ["mitarbeiterProjekt", "Mitarbeiter Projekt"],
          ].map((el) => {
            return (
              <>
                <Text style={{ fontWeight: 600 }}>{el[1]}</Text>
                <Text style={{ marginBottom: 5 }}>
                  {letter[el[0]] ? letter[el[0]] : "-"}
                </Text>
              </>
            );
          })}
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontWeight: 600, marginBottom: 10, fontSize: 12 }}>
            Sonstiges:
          </Text>
          {[
            ["hauptamtlichAnzahl", "Hauptamtlich Anzahl"],
            ["hauptamtlichStunden", "Hauptamtlich Stunden"],
            ["ehrenamtlichAnzahl", "Ehrenamtlich Anzahl"],
            ["ehrenamtlichStunden", "Ehrenamtlich Stunden"],
            ["beschreibungProjekt", "Beschreibung Projekt"],
            ["zielsetzungProjekt", "Zielsetzung Projekt"],
            ["benachteiligungProjekt", "Benachteiligung Projekt"],
            ["umsetzungProjekt", "Umsetzung Projekt"],
            ["bisherigeErgebnisse", "Bisherige Ergebnisse"],
            ["eigenmittel", "Eigenmittel"],
            ["oeffentlicheZuwendungen", "Öffentliche Zuwendungen"],
            ["privateSpenden", "Private Spenden"],
            ["bisherigeFoerderung", "bisherige Förderungen"],
            ["zuwendungAndere", "zuwendung Andere"],
          ].map((el) => {
            return (
              <div key={el[1]}>
                <Text style={{ fontWeight: 600 }}>{el[1]}</Text>
                <Text style={{ marginBottom: 5 }}>
                  {letter[el[0]] ? letter[el[0]] : "-"}
                </Text>
              </div>
            );
          })}
        </View>
      </View>
    </Page>
  </Document>
);
