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

export default function BotschafterEmail({ botschafter }) {
  return (
    <Html>
      <Head />
      <Preview>
        Botschafter Übersicht - 11. Town &amp; Country Stiftungspreis
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`https://stiftungspreis.tc-stiftung.de/tcs_logo.svg`} //TODO: URL in Production ersetzen
            alt="TCS Logo"
            width={120}
            height={24}
            priority
          />
          <Section style={section}>
            <Text style={text}>Sehr geehrter Botschafter</Text>
            <Text style={text}>
              es ist so weit: die diesjährigen 1.111 Euro Preisträger des 11.
              Town &amp; Country Stiftungspreises sind ausgewählt! 300 Vereine
              und Einrichtungen bundesweit können ab Februar 2024 besucht und
              die Förderungen mit einer symbolischen Urkunde persönlich
              überreicht werden.{" "}
            </Text>
            <Text style={text}>
              <strong>
                Dabei freuen wir uns wieder auf Ihre tatkräftige Unterstützung!
              </strong>
            </Text>
            <Text style={text}>
              Im Anhang finden Sie eine <strong>Übersicht</strong>, welche
              Projekte in Ihrer Region gefördert werden. Bitte prüfen Sie die
              Angaben und{" "}
              <strong>geben Sie uns bis zum 10.01.2024 eine Rückmeldung</strong>
              , ob Sie die Übergaben für diese Projekte übernehmen können.{" "}
              <br />
              <strong>Vielen Dank!</strong>
            </Text>
            <Text style={text}>
              <i>
                (Unsere Bitte: Da wir die Preisträger ab Februar 2024 auf
                unserer Webseite bekannt geben, bitten wir Sie bis dahin
                zunächst um eine vertrauliche Behandlung. Bitte informieren Sie
                die Preisträger noch nicht über eine Förderung. Sie erhalten
                dazu gesonderte Informationen von uns.)
              </i>
            </Text>
            <Text style={text}>
              Falls Sie zeitliche Schwierigkeiten für Übergaben sehen, geben Sie
              uns bitte Bescheid. Wenn Sie Fragen haben, zögern Sie nicht und
              rufen Sie uns gerne an.
            </Text>
            <Text style={text}>
              Vielen Dank für Ihre Unterstützung und Ihr soziales Engagement!
            </Text>
          </Section>

          <Text>
            <strong>
              Ihr Team der <br /> Town &amp; Country Stiftung
            </strong>{" "}
            <br />
            Anger 55/56, <br />
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
