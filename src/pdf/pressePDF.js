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

export const PressePDF = ({ letter }) => (
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
          <Text style={styles.subTitle}>11. Town & Country Stiftungspreis</Text>
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text>{`Bundesland Träger: ${letter.bundeslandTraeger} \n`}</Text>
          <Text>{`Bundesland Projekt: ${
            letter.bundeslandProjekt ? letter.bundeslandProjekt : "-"
          }`}</Text>
        </View>
        <View style={{ fontWeight: 600, marginBottom: 10 }}>
          <Text>Projekt-Nr.: {letter.id}</Text>
          <Text>Träger: {letter.nameTraeger}</Text>
          <Text>Projekt: {letter.nameProjekt ? letter.nameProjekt : "-"}</Text>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text>Botschafter-Nr.: {letter.botschafter.id}</Text>
          <Text>
            Botschafter: {letter.botschafter.vorname} {letter.botschafter.name}
          </Text>
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontWeight: 600, marginBottom: 10 }}>
            Projektbeschreibung:
          </Text>
          <Text style={{ fontWeight: 600 }}>Pressetext:</Text>
          <Text style={{ marginBottom: 5 }}>
            {letter.presseText ? letter.presseText : "-"}
          </Text>
          <Text style={{ fontWeight: 600 }}>Projektbeschreibung:</Text>
          <Text style={{ marginBottom: 5 }}>
            {letter.beschreibungProjekt ? letter.beschreibungProjekt : "-"}
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);
