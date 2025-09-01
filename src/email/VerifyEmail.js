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

export default function VerifyEmail({ letter }) {
  return (
    <Html>
      <Head />
      <Preview>
        {letter.sonderpreis
          ? "Town & Country Stiftungs-Sonderpreis:"
          : "12. Town & Country Stiftungspreis:"}
        : Bitte bestätigt Eure Bewerbung
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

          <Text style={title}>
            Bewerbung: <br />
            <strong>{letter.nameTraeger}</strong> <br />
            <strong>{letter.nameProjekt}</strong>
          </Text>

          <Section style={section}>
            <Text style={text}>Liebe Bewerber:innen,</Text>
            <Text style={text}>
              vielen Dank für Eure Teilnahme am{" "}
              {letter.sonderpreis
                ? "Stiftungs-Sonderpreis"
                : "12. Town & Country Stiftungspreis"}
              .
            </Text>
            <Text style={text}>
              Mit Klicken des Links bestätigt Ihr Eure Teilnahme am{" "}
              {letter.sonderpreis
                ? "Stiftungs-Sonderpreis"
                : "12. Town & Country Stiftungspreis"}
              .
            </Text>

            <Button
              style={button}
              href={
                process.env.NEXTAUTH_URL +
                "/bewerbung/verify?verifyId=" +
                letter.verifyId
              }
            >
              <Text style={buttonText}>Bewerbung bestätigen</Text>
            </Button>
            <Text style={text}>
              Sollte der Link oben nicht funktionieren, bitte folgende URL in
              den Browser kopieren:
            </Text>
            <Text style={textbold}>
              {process.env.NEXTAUTH_URL +
                "/bewerbung/verify?verifyId=" +
                letter.verifyId}
            </Text>
          </Section>
          <Text style={textbold}>
            Solltet Ihr diesen Link nicht bestätigen, kann Eure Bewerbung zur
            Teilnahme am{" "}
            {letter.sonderpreis
              ? "Stiftungs-Sonderpreis"
              : "12. Town & Country Stiftungspreis"}{" "}
            nicht berücksichtigt werden.
          </Text>
          <Text style={text}>
            Falls es sich bei Eurer Bewerbung um ein Versehen handelt oder Ihr
            Eure Bewerbung zurückziehen möchtet, müsst Ihr nicht reagieren. Ihr
            werdet keine weiteren E-Mails von uns erhalten.
          </Text>
          <Text style={text}>
            Mit den untenstehenden Links informieren wir Euch nochmals über die
            geltenden Teilnahmebedingungen und die Datenschutzerklärung, die Ihr
            als verbindlich anerkannt habt.
          </Text>

          <Text style={links}>
            <Link
              href={
                letter.sonderpreis
                  ? "https://www.tc-stiftung.de/wp-content/uploads/2025/08/2025_DSErklBew_SP.pdf"
                  : "https://www.tc-stiftung.de/wp-content/uploads/2025/08/2025_DSErklBew_12_STP.pdf"
              }
              style={link}
            >
              Hier findet Ihr die Datenschutzerklärung
            </Link>{" "}
            <br />
            <Link
              href={
                letter.sonderpreis
                  ? "https://www.tc-stiftung.de/wp-content/uploads/2025/08/2025_AllgTeilnBed_SP.pdf"
                  : "https://www.tc-stiftung.de/wp-content/uploads/2025/08/2025_AllgTeilnBed_12.STP_-1.pdf"
              }
              style={link}
            >
              Hier findet Ihr die Teilnahmebedingungen des{" "}
              {letter.sonderpreis
                ? "Stiftungs-Sonderpreises"
                : "12. Town & Country Stiftungspreises"}
            </Link>
          </Text>

          <Text>
            <strong>
              Euer Team der <br /> Town &amp; Country Stiftung
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
