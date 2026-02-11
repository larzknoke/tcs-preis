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

export default function CancelInviteEmail({ invite }) {
  return (
    <Html>
      <Head />
      <Preview>Betreff: 12. Town & Country Stiftungsgala – Absage</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`https://stiftungspreis.tc-stiftung.de/tcs_logo.svg`} //TODO: URL in Production ersetzen
            alt="TCS Logo"
            width={120}
            height={24}
            priority
          />

          <Text style={title}>Absage bestätigt</Text>

          <Section style={section}>
            <Text style={text}>
              Sehr geehrte/r {invite.titel ? invite.titel : ""} {invite.vorname}{" "}
              {invite.name},
            </Text>
            <Text style={text}>
              Vielen Dank für Ihre Nachricht. Schade, dass Sie nicht an der 12.
              Town & Country Stiftungsgala teilnehmen können.
            </Text>
            <Text style={text}>
              <strong>Wir haben folgende Daten erfasst:</strong>
            </Text>
            <Text style={text}>
              <strong>Name:</strong>
              {invite.titel || ""} {invite.vorname} {invite.name}
              <br />
              <strong>Unternehmen: </strong>
              {invite.unternehmen || "-"}
              <br />
              <strong>Teilnahme: </strong>
              {invite.teilnahme ? "Ja" : "Nein"}
              <br />
              <strong>Spende: </strong>
              {invite.spende ? (
                <span>
                  Ich/wir leiste/n eine Spende in Höhe von{" "}
                  {invite.spendeBetrag || "-"} €<br />
                  Spendenkonto: <br />
                  Weberbank Berlin, IBAN: DE25 1012 0100 6156 1780 00 <br />
                  Verwendungszweck: <br /> „Spende Preisverleihung“ online
                  spenden: <br />
                  <a href="https://www.paypal.com/donate/?hosted_button_id=U5NFSF7NAVGK2">
                    https://www.paypal.com/donate/?hosted_button_id=U5NFSF7NAVGK2
                  </a>
                </span>
              ) : (
                "Nein"
              )}
              <br />
              <strong>Betrag: </strong>
              {invite.spendeBetrag || "-"}
              <br />
              <strong>Email: </strong>
              {invite.email || "-"}
              <br />
              <strong>Telefon: </strong>
              {invite.telefon || "-"}
              <br />
              <strong>Begleitung: </strong>
              {invite.begleitungTitel || "-"} {invite.begleitungVorname || "-"}{" "}
              {invite.begleitungName || "-"}{" "}
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
