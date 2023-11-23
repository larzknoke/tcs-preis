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

export const BotschafterPDF = ({ bot }) => (
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
        <Text style={{ fontWeight: 600 }}>Botschafter</Text>
        <Text style={styles.title}>
          {`${bot.id} | ${bot.vorname} ${bot.name} | ${bot.bundesland}`}
        </Text>
        <Text>
          {bot.typ} / {bot.firma}
        </Text>

        <Text style={{ fontWeight: 600, marginTop: 10 }}>Kontakt:</Text>
        <Text>{bot.strasse}</Text>
        <Text>
          {bot.plz} {bot.ort}
        </Text>
        <Text style={{ marginTop: 5 }}>Tel.: {bot.telefon || "-"}</Text>
        <Text>Mobil: {bot.mobil || "-"}</Text>
        <Text>Email {bot.email || "-"}</Text>

        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <Text style={styles.subTitle}>Bewerbungen:</Text>
          {bot.letters &&
            bot.letters.map((letter) => {
              return (
                <View
                  style={{
                    marginBottom: 10,
                    borderBottom: 1,
                    paddingBottom: 10,
                    borderBottomColor: "#ccc",
                  }}
                >
                  <View style={styles.row}>
                    <Text style={{ fontWeight: 600 }}>{letter.id}</Text>
                    <Text style={{ fontWeight: 600 }}>
                      {letter.bundeslandTraeger || letter.bundeslandProjekt}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text>Träger: {letter.nameTraeger}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text>Name: {letter.nameProjekt}</Text>
                  </View>
                  <View>
                    <Text style={{ fontWeight: 600, marginTop: 5 }}>
                      Kontakt:
                    </Text>
                    <View style={styles.row}>
                      <View>
                        <Text>{letter.ansprechpartnerProjekt}</Text>
                        <Text>{letter.strasseProjekt}</Text>
                        <Text>
                          {letter.plzProjekt} {letter.ortProjekt}
                        </Text>
                      </View>
                      <View>
                        <Text>Tel.: {letter.telefonnummerProjekt}</Text>
                        <Text>Mobil: {letter.mobilProjekt}</Text>
                        <Text>Email: {letter.emailProjekt}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
        </View>
      </View>
    </Page>
  </Document>
);
