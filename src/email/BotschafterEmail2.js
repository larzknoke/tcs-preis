import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export default function BotschafterEmail2({ botschafter, anreden = [] }) {
  return (
    <Html>
      <Head />
      <Preview>
        12. Town & Country Stiftungspreis – überbringen Sie die gute Nachricht
        zuerst?
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`https://stiftungspreis.tc-stiftung.de/tcs_logo.svg`} //TODO: URL in Production ersetzen
            alt="TCS Logo"
            width={120}
            height={24}
            priority={"true"}
          />
          <Section style={section}>
            <Text style={text}>
              {anreden.map((anrede) => {
                return (
                  <>
                    {anrede} <br />
                  </>
                );
              })}
            </Text>
            <Text style={text}>
              vielen Dank, dass Sie sich an der Übergabe der Stiftungspreise
              2024 beteiligen! Für unsere Arbeit spielen Sie eine bedeutende
              Rolle: Sie vertreten die Town &amp; Country Stiftung vor Ort und
              sind unser Kontakt zu den Preisträgern.
            </Text>
            <Text style={text}>
              Deshalb geben wir Ihnen gern die Gelegenheit, die gute Nachricht
              zuerst zu überbringen: Anfang Februar informieren wir die
              Preisträger und veröffentlichen sie auf www.tc-stiftung.de – bis
              dahin laden wir Sie herzlich ein, vorab exklusiv Kontakt
              aufzunehmen und Freude zu verbreiten!
            </Text>
            <Text style={text}>
              Die Kontaktdaten haben wir anbei bereits für Sie zusammengestellt.
            </Text>
            <Text style={text}>
              Vereinbaren Sie am besten gleich einen Termin für die symbolische
              Übergabe. Diese soll möglichst bis Ende Mai stattfinden. Bitte
              teilen Sie uns den/die vereinbarten Termin/e zeitnah mit. So
              können wir das Preisgeld wie gewohnt direkt nach der Übergabe
              überweisen – und Sie tatkräftig mit Pressearbeit unterstützen.
            </Text>
            <Text style={text}>
              Anbei finden Sie auch eine <strong>Checkliste</strong> sowie
              Hinweise für die optimale Vorbereitung der Übergabe.
            </Text>
            <Text style={text}>
              Für Rückfragen stehen wir Ihnen gern zur Verfügung – und danken
              Ihnen herzlich für Ihr Engagement als Botschafterin bzw.
              Botschafter der Town &amp; Country Stiftung!
            </Text>
          </Section>

          <Text>
            <strong>
              Ihr Team der <br /> Town &amp; Country Stiftung
            </strong>
            <br />
            Anger 55/56 <br />
            99084 Erfurt <br />
            Tel. 0361 644 789-14 <br />
            stiftungspreis@tc-stiftung.de <br />
            www.tc-stiftung.de
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#ffffff",
  color: "#24292e",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
};

const container = {
  width: "700px",
  maxWidth: "700px",
  margin: "0 auto",
  padding: "20px 0 48px",
};

const title = {
  fontSize: "20px",
  lineHeight: 1.25,
  color: "#284879",
};

const section = {
  padding: "24px",
  border: "solid 1px #dedede",
  borderRadius: "5px",
  textAlign: "center",
  marginTop: "10px",
  marginBottom: "10px",
};

const text = {
  margin: "0 0 15px 0",
  textAlign: "left",
};

const textbold = {
  margin: "0 0 10px 0",
  textAlign: "left",
  fontWeight: "bold",
};

const button = {
  fontSize: "14px",
  backgroundColor: "#284879",
  color: "#fff",
  lineHeight: 1.5,
  borderRadius: "0.5em",
};

const buttonText = {
  margin: 0,
  lineHeight: 1,
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 15,
  paddingRight: 15,
};

const links = {
  textAlign: "center",
};

const link = {
  color: "#0366d6",
  fontSize: "12px",
};

const footer = {
  color: "#6a737d",
  fontSize: "12px",
  textAlign: "center",
  marginTop: "60px",
};
