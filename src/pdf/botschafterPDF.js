import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import { Capatilizer, dateFormatter } from "@/lib/utils";

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
    fontSize: 13,
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

export const BotschafterPDF = ({
  bot,
  zusatzAngaben = true,
  allLetter = true,
}) => (
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
        <Text style={styles.subTitle}>Botschafter</Text>
        <Text style={styles.title}>
          {`${bot.id} | ${bot.vorname} ${bot.name} | ${bot.bundesland}`}
        </Text>
        <Text>
          {bot.typ} / {bot.firma}
        </Text>

        <View style={styles.row}>
          <View style={{ width: "50%" }}>
            <Text style={{ fontWeight: 600, marginTop: 10 }}>Kontakt:</Text>
            <Text>{bot.strasse}</Text>
            <Text>
              {bot.plz} {bot.ort}
            </Text>
            <Text style={{ marginTop: 5 }}>Tel.: {bot.telefon || "-"}</Text>
            <Text>Mobil: {bot.mobil || "-"}</Text>
            <Text>Email {bot.email || "-"}</Text>
          </View>
          <View style={{ width: "50%" }}>
            {bot && bot.botcontacts?.length > 0 && (
              <Text style={{ fontWeight: 600, marginTop: 10 }}>
                Botschafter-Ansprechpartner:
              </Text>
            )}
            {bot &&
              bot.botcontacts?.length > 0 &&
              bot.botcontacts.map((botcontact) => {
                return (
                  <View>
                    <Text style={{ fontWeight: 600, marginTop: 5 }}>
                      {botcontact.name}
                    </Text>
                    <Text>{botcontact.funktion || "-"}</Text>
                    <Text>{botcontact.email || "-"}</Text>
                    <Text>Tel.: {botcontact.telefon || "-"}</Text>
                    <Text>Mobil: {botcontact.mobil || "-"}</Text>
                  </View>
                );
              })}
          </View>
        </View>
        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <Text style={{ fontWeight: 600, color: "#b2c243" }}>
            Bitte prüfen Sie, ob Sie die Übergabe für die nachfolgenden Projekte
            übernehmen können und geben Sie uns bitte bis zum 10.01.2024 eine
            Rückmeldung. Vielen Dank!
          </Text>
          <Text style={{ fontWeight: 600, marginTop: 10, color: "#b2c243" }}>
            Unsere Bitte: Da wir die Preisträger ab Februar 2024 auf unserer
            Webseite bekannt geben, bitten wir Sie bis dahin zunächst um eine
            vertrauliche Behandlung. Bitte informieren Sie die Preisträger noch
            nicht über eine Förderung. Sie erhalten dazu gesonderte
            Informationen von uns.
          </Text>
        </View>

        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <Text style={styles.subTitle}>Bewerbungen</Text>
          {bot.letters &&
            bot.letters
              .filter(
                (letter) =>
                  allLetter ||
                  letter.status == "1111" ||
                  letter.status == "ausland1111"
              )
              .map((letter) => {
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
                      <Text style={{ fontWeight: 600 }}>ID: {letter.id}</Text>
                      <Text style={{ fontWeight: 600 }}>
                        Status: {Capatilizer(letter.status)}
                      </Text>
                      <Text style={{ fontWeight: 600 }}>
                        Bundesland:{" "}
                        {letter.bundeslandTraeger || letter.bundeslandProjekt}
                      </Text>
                    </View>
                    <View style={styles.row}>
                      <Text>Träger: {letter.nameTraeger}</Text>
                    </View>
                    <View style={styles.row}>
                      <Text>Projekt: {letter.nameProjekt}</Text>
                    </View>
                    <View>
                      <Text style={{ fontWeight: 600, marginTop: 5 }}>
                        Kontakt Projekt:
                      </Text>
                      <View style={styles.row}>
                        <View style={{ width: "50%" }}>
                          <Text>{letter.ansprechpartnerProjekt}</Text>
                          <Text>{letter.strasseProjekt}</Text>
                          <Text>
                            {letter.plzProjekt} {letter.ortProjekt}
                          </Text>
                        </View>
                        <View style={{ width: "50%" }}>
                          <Text>Tel.: {letter.telefonnummerProjekt}</Text>
                          <Text>Mobil: {letter.mobilProjekt}</Text>
                          <Text>Email: {letter.emailProjekt}</Text>
                        </View>
                      </View>
                    </View>
                    {!letter.plzProjekt && !letter.ortProjekt && (
                      <View>
                        <Text style={{ fontWeight: 600, marginTop: 5 }}>
                          Kontakt Träger:
                        </Text>
                        <View style={styles.row}>
                          <View style={{ width: "50%" }}>
                            <Text>{letter.nameTraeger}</Text>
                            <Text>{letter.vorstandTraeger}</Text>
                            <Text>{letter.strasseTraeger}</Text>
                            <Text>
                              {letter.plzTraeger} {letter.ortTraeger}
                            </Text>
                          </View>
                        </View>
                      </View>
                    )}
                    {letter && letter.lettercontacts?.length > 0 && (
                      <View>
                        <Text style={{ fontWeight: 600, marginTop: 5 }}>
                          weiterer Botschafter-Kontakt:
                        </Text>
                        {letter &&
                          letter.lettercontacts.length > 0 &&
                          letter.lettercontacts.map((contact) => {
                            return (
                              <View style={styles.row}>
                                <Text>{contact.name}</Text>
                                <Text>{contact.funktion || "-"}</Text>
                                <Text>{contact.email || "-"}</Text>
                                <Text>Tel.: {contact.telefon || "-"}</Text>
                                <Text>Mobil: {contact.mobil || "-"}</Text>
                              </View>
                            );
                          })}
                      </View>
                    )}
                    {zusatzAngaben && (
                      <View>
                        <Text style={{ fontWeight: 600, marginTop: 5 }}>
                          Übergabe:
                        </Text>
                        <View style={styles.row}>
                          <View style={{ width: "50%" }}>
                            <Text>
                              Zuordnung bestätigt:{" "}
                              {letter.botschafterConfirm ? "Ja" : "Nein"}
                            </Text>
                            <Text>
                              Fotos: {letter.bildmaterial ? "Ja" : "Nein"}
                            </Text>
                            <Text>
                              Pressearbeit erwünscht:{" "}
                              {letter.presseErlaubt ? "Ja" : "Nein"}
                            </Text>
                          </View>
                          <View style={{ width: "50%" }}>
                            <Text>
                              Übergabe Datum:{" "}
                              {letter.terminUebergabe
                                ? dateFormatter(letter.terminUebergabe, true)
                                : "-"}
                            </Text>
                            <Text>
                              Termin Überweisung 1.111€ :{" "}
                              {letter.terminGeld
                                ? dateFormatter(letter.terminGeld, true)
                                : "-"}
                            </Text>
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                );
              })}
        </View>
      </View>
    </Page>
  </Document>
);
