import {
  VStack,
  Card,
  Heading,
  Container,
  Text,
  CardBody,
} from "@chakra-ui/react";

function VerifyError() {
  return (
    <Container
      display={"flex"}
      flexDirection={"column"}
      maxWidth={"6xl"}
      textAlign={"center"}
      mt={16}
    >
      <Card>
        <CardBody>
          <VStack gap={6} p={6}>
            <Heading size={"md"} color={"red.600"}>
              Bestätigungsfehler
            </Heading>
            <Text>
              Der Verifizierungs-Link wurde entweder schon bestätigt und ist nun
              ungültig oder ein Fehler ist aufgetreten.
            </Text>
            <Text>Bitte kontaktiert die Town & Country Stiftung:</Text>
          </VStack>
        </CardBody>
      </Card>
    </Container>
  );
}

export default VerifyError;
