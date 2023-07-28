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
        A fine-grained personal access token has been added to your account
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`${process.env.NEXTAUTH_URL}/tcs_logo.svg`}
            alt="TCS Logo"
            width={120}
            height={24}
            priority
          />

          <Text style={title}>
            Bewerbung: <strong>{letter.organisationProjekt}</strong>
          </Text>

          <Section style={section}>
            <Text style={text}>Hallo {letter.ansprechpartnerProjekt}</Text>
            <Text style={text}>
              Bitte bestätigen Sie Ihre Bewerbung mit diesem Link:
            </Text>

            <Button
              style={button}
              href={
                process.env.NEXTAUTH_URL + "/letter/verify/" + letter.verifyId
              }
            >
              <Text style={buttonText}>Bewerbung bestätigen</Text>
            </Button>
          </Section>
          <Text style={links}>
            <Link style={link}>Datenschutz</Link> ・{" "}
            <Link style={link}>Kontakt</Link>
          </Text>

          <Text style={footer}>
            Town & Country Stiftung Stiftung ・ Hauptstraße 90 E ・99820
            Hörselberg – Hainich OT Behringen
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

function padding(a, b, c, d) {
  return {
    paddingTop: a,
    paddingRight: b !== undefined ? b : a,
    paddingBottom: c !== undefined ? c : a,
    paddingLeft: d !== undefined ? d : b !== undefined ? b : a,
  };
}

const main = {
  backgroundColor: "#ffffff",
  color: "#24292e",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
};

const container = {
  width: "480px",
  margin: "0 auto",
  padding: "20px 0 48px",
};

const title = {
  fontSize: "24px",
  lineHeight: 1.25,
};

const section = {
  padding: "24px",
  border: "solid 1px #dedede",
  borderRadius: "5px",
  textAlign: "center",
};

const text = {
  margin: "0 0 10px 0",
  textAlign: "left",
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
