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

export default function LetterEmail1({ letter, anreden = [] }) {
  return (
    <Html>
      <Head />
      <Preview>
        11. Town & Country Stiftungspreis: Gratulation – und 1.111 Euro für{" "}
        {letter.nameProjekt}
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
              Sehr geehrte/r Frau/Herr {letter.ansprechpartnerProjekt}
            </Text>
            <Text style={text}>mit Ihrer Arbeit und dem Projekt</Text>
            <Text>
              <strong>{letter.nameProjekt}</strong>
            </Text>
            <Text style={text}>
              leisten Sie einen wichtigen Beitrag zur Chancengleichheit
              benachteiligter junger Menschen. Daher wurde Ihre Einrichtung von
              der Town & Country Stiftung im Rahmen des 11. Town & Country
              Stiftungspreises ausgewählt: Sie würdigt Ihr wichtiges Engagement
              mit 1.111 Euro Preisgeld – und der zusätzlichen Chance auf den
              Landespreis, dotiert mit weiteren 5.000 Euro.
            </Text>
            <Text style={text}>Unser herzlichster Glückwunsch!</Text>
            {letter.botschafterConfirm ? (
              <>
                <Text style={textbold}>Wie geht es weiter?</Text>
                <Text style={text}>
                  Die Ehrung nehmen unsere regionalen Stiftungsbotschafter im
                  Namen der Town & Country Stiftung anlässlich einer
                  symbolischen Übergabe vor. Vereinbaren Sie (falls nicht
                  bereits geschehen) einen Termin für die symbolische Übergabe
                  und teilen Sie uns diesen zeitnah mit. So können wir das
                  Preisgeld parallel zur Übergabe überweisen – und Sie
                  bestmöglich mit Pressearbeit unterstützen.
                </Text>
                <Text style={text}>Ihr regionaler Stiftungsbotschafter:</Text>
                <Text style={bottext}>
                  {letter.botschafter.firma} <br />
                  {letter.botschafter.anrede} {letter.botschafter.vorname}{" "}
                  {letter.botschafter.name}
                  <br />
                  {letter.botschafter.telefon} <br />
                  {letter.botschafter.email}
                </Text>
                {letter.botschafter.botcontacts.length > 0 &&
                  letter.botschafter.botcontacts.map((contact) => {
                    return (
                      <Text style={bottext}>
                        {contact.name} <br />
                        {contact.funktion} <br />
                        {contact.telefon} <br />
                        {contact.email}
                      </Text>
                    );
                  })}
                <Text style={text}>
                  Für die Vorbereitung der Übergabe senden wir Ihnen anbei
                  einige Informationen sowie eine <strong>Checkliste</strong>.
                  Bitte beachten Sie insbesondere die <strong>Hinweise</strong>{" "}
                  für Fotoaufnahmen. Für eine optimale Pressearbeit benötigen
                  wir die Bilder direkt nach der Übergabe – inkl. Nennung des
                  Fotografen und der ausgefüllter Einverständniserklärung, die
                  ebenfalls anhängt.
                </Text>
                <Text style={text}>
                  Wir freuen uns über Ihr großartiges Engagement, auf die
                  Übergabe der Urkunde – und auf begeisternde Fotos!
                </Text>
                <Text style={textbold}>
                  Ihr Team der <br /> Town &amp; Country Stiftung
                </Text>
                <Text style={text}>
                  <strong>Anlagen</strong> <br />
                  Vorbereitung und Checkliste Übergabe <br />
                  Hinweise zu Fotoaufnahmen <br />
                  Einverständniserklärung Fotoaufnahmen <br />
                  Datenschutzerklärung
                </Text>
                <Text style={text}>
                  PS: Die Landespreisträger werden in der Jurysitzung am 14.
                  März 2024 gekürt und anschließend zur Stiftungspreis-Gala am
                  21. Juni 2024 nach Erfurt eingeladen. Wir drücken Ihnen die
                  Daumen!
                </Text>
              </>
            ) : (
              <>
                <Text style={textbold}>Wie geht es weiter?</Text>
                <Text style={text}>
                  Freuen Sie sich auf Ihre persönliche Urkunde als symbolische
                  Übergabe, die Sie in den nächsten Tagen von uns erhalten.
                  Bitte stellen Sie uns anschließend für unsere Presse- und
                  Öffentlichkeitsarbeit ein Foto mit der Urkunde zur Verfügung –
                  weitere Informationen dazu senden wir Ihnen zusammen mit der
                  Urkunde.
                </Text>
                <Text style={text}>
                  Wir freuen uns über Ihr großartiges Engagement, gratulieren
                  Ihnen nochmals herzlich zur Förderung mit dem Stiftungspreis
                  und wünschen viel Freude bei der Umsetzung Ihres Vorhabens!
                </Text>
                <Text style={textbold}>
                  Ihr Team der <br /> Town &amp; Country Stiftung
                </Text>
                <Text s tyle={text}>
                  PS: Die Landespreisträger werden in der Jurysitzung am 14.
                  März 2024 gekürt und anschließend zur Stiftungspreis-Gala am
                  21. Juni 2024 nach Erfurt eingeladen. Wir drücken Ihnen die
                  Daumen!
                </Text>
              </>
            )}
          </Section>
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

const bottext = {
  margin: "0 0 15px 30px",
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
