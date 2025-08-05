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
        12. Town & Country{" "}
        {letter.sonderpreis ? "Sonderpreis" : "Stiftungspreis"}: Bitte
        bestätigen Sie Ihre Bewerbung
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
            <Text style={text}>Sehr geehrte Bewerber:innen,</Text>
            <Text style={text}>
              vielen Dank für Ihre Bewerbung zum diesjährigen 12. Town &amp;
              Country {letter.sonderpreis ? "Sonderpreis" : "Stiftungspreis"}.
            </Text>
            <Text style={text}>
              Um Ihre Bewerbung zu aktivieren, klicken Sie bitte auf folgenden
              Link:
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
              Wenn der Link oben nicht funktioniert kopieren Sie bitte folgende
              URL in Ihren Browser:
            </Text>
            <Text style={textbold}>
              {process.env.NEXTAUTH_URL +
                "/bewerbung/verify?verifyId=" +
                letter.verifyId}
            </Text>
          </Section>
          <Text style={text}>
            Mit dem vorstehenden Link bestätigen Sie, dass Sie sich zur
            Teilnahme am diesjährigen 12. Town &amp; Country{" "}
            {letter.sonderpreis ? "Sonderpreis" : "Stiftungspreis"}
            beworben haben und aktivieren Ihre Bewerbung.
          </Text>
          <Text style={textbold}>
            Sollten Sie diesen Link nicht bestätigen, kann Ihre Bewerbung zur
            Teilnahme am 12. Town &amp; Country{" "}
            {letter.sonderpreis ? "Sonderpreis" : "Stiftungspreis"} nicht
            berücksichtigt werden.
          </Text>
          <Text style={text}>
            Falls es sich bei Ihrer Bewerbung um ein Versehen handelt oder Sie
            Ihre Bewerbung zurückziehen möchten, müssen Sie nicht reagieren. Sie
            werden keine weiteren E-Mails von uns erhalten.
          </Text>
          <Text style={text}>
            Mit den untenstehenden Links informieren wir Sie nochmals über die
            geltenden Teilnahmebedingungen und die Datenschutzerklärung, die Sie
            als verbindlich anerkannt haben.
          </Text>

          <Text style={links}>
            <Link
              href="https://www.tc-stiftung.de/wp-content/uploads/2025/08/2025_DSErklBew_12_STP.pdf"
              style={link}
            >
              Hier finden Sie die Datenschutzerklärung
            </Link>{" "}
            <br />
            <Link
              href="https://www.tc-stiftung.de/wp-content/uploads/2025/08/2025_AllgTeilnBed_12.STP_.pdf"
              style={link}
            >
              Hier finden Sie die Teilnahmebedingungen des 12. Town &amp;
              Country {letter.sonderpreis ? "Sonderpreis" : "Stiftungspreis"}
            </Link>
          </Text>

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
