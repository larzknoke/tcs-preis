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

export default function VerifyInvite({ invite }) {
  return (
    <Html>
      <Head />
      <Preview>
        11. Town & Country Stiftungsgala – bitte bestätigen Sie Ihre Anmeldung
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

          <Text style={title}>Teilnahme bestätigen</Text>

          <Section style={section}>
            <Text style={text}>
              Sehr geehrte/r {invite.titel ? invite.titel : ""} {invite.vorname}{" "}
              {invite.name},
            </Text>
            <Text style={text}>
              bitte bestätigen Sie Ihre Teilnahme an der 11. Town & Country
              Stiftungsgala am 21. Juni 2024 durch einen Klick auf den folgenden
              Link.
            </Text>
            <Text style={text}>
              <strong>
                Erst dadurch wird die Anmeldung erfolgreich abgeschlossen.
              </strong>
            </Text>

            <Button
              style={button}
              href={
                process.env.NEXTAUTH_URL +
                "/anmeldung/verify?verifyId=" +
                invite.verifyId
              }
            >
              <Text style={buttonText}>Teilnahme bestätigen</Text>
            </Button>
            <Text style={text}>
              Wenn der Link oben nicht funktioniert kopieren Sie bitte folgende
              URL in Ihren Browser:
            </Text>
            <Text style={textbold}>
              {process.env.NEXTAUTH_URL +
                "/anmeldung/verify?verifyId=" +
                invite.verifyId}
            </Text>
          </Section>

          <Text>
            <strong>
              Ihr Team der <br /> Town &amp; Country Stiftung
            </strong>{" "}
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
  marginBottom: "10px",
};

const text = {
  margin: "0 0 10px 0",
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
  marginBottom: "10px",
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
