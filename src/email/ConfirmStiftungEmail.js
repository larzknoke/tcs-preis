import { Table, Td, Tr } from "@chakra-ui/react";
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

export default function ConfirmStiftungEmail({ letter }) {
  return (
    <Html>
      <Head />
      <Preview>TC-Stiftung | Bewerbung 2025</Preview>
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
            Eingang Bewerbung: <br />
            <strong>
              ID: {letter.id} /{" "}
              {letter.sonderpreis ? "Sonderpreis" : "Stiftungspreis"}
            </strong>{" "}
            <br />
            <strong>{letter.nameTraeger}</strong> <br />
            <strong>{letter.nameProjekt}</strong>
          </Text>

          <Section style={sectionLeft}>
            <Table>
              {Object.entries(letter).map(([k, v]) => {
                return (
                  <Tr>
                    <Td textAlign={"left"}>{k}</Td>
                    <Td textAlign={"left"}>{JSON.stringify(v)}</Td>
                  </Tr>
                );
              })}
            </Table>
          </Section>

          <Text style={links}>
            <Link style={link}>Datenschutz</Link> ・{" "}
            <Link style={link}>Kontakt</Link>
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
};

const sectionLeft = {
  padding: "24px",
  border: "solid 1px #dedede",
  borderRadius: "5px",
  textAlign: "left",
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
